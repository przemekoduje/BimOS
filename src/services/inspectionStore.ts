import type { PreInspectionContext } from './aiService';

export interface ChecklistItem {
  pillar: number;
  description: string;
  problem_quote?: string;
  location: string;
  verification_question?: string;
  status: 'pending' | 'checked' | 'error';
  is_historical: boolean;
  is_mandatory: boolean;
}

export interface LiveFeedItem {
  id: string;
  timestamp: string;
  source: 'ad-hoc' | 'auto-detect';
  image_url?: string;
  transcription?: string;
  ai_analysis: string;
  severity: 'critical' | 'warning' | 'info';
  estimated_size?: string;
  ar_bounding_box?: { x: number; y: number; width: number; height: number };
}

export interface ComplianceGap {
  item: string;
  issue: string;
  status: 'missing' | 'fixed';
}

class InspectionStore {
  private context: PreInspectionContext | null = null;
  private checklist: ChecklistItem[] = [];
  private complianceGaps: ComplianceGap[] = [];
  private structuralAlerts: string[] = [];
  private spatialSynonyms: Record<string, string[]> = {};
  private unverifiedHistory: boolean = false;

  // Nowe stany dla Live Inspection Module
  private liveFeedItems: LiveFeedItem[] = [];
  private visitedZones: Set<string> = new Set();

  setContext(context: PreInspectionContext, unverified: boolean = false) {
    this.context = context;
    this.unverifiedHistory = unverified;
    this.generateDynamicChecklist(context);
    this.buildSpatialDictionary(context);
  }

  getContext() {
    return this.context;
  }

  getChecklist() {
    return this.checklist;
  }

  getComplianceGaps() {
    return this.complianceGaps;
  }

  getStructuralAlerts() {
    return this.structuralAlerts;
  }

  isUnverified() {
    return this.unverifiedHistory;
  }

  // Live Inspection Methods
  addLiveFeedItem(item: Omit<LiveFeedItem, 'id' | 'timestamp'>) {
    const newItem: LiveFeedItem = {
      ...item,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    this.liveFeedItems.push(newItem);
    return newItem;
  }

  getLiveFeedItems() {
    return this.liveFeedItems;
  }

  markZoneVisited(zone: string) {
    this.visitedZones.add(zone.toLowerCase());
  }

  getVisitedZones() {
    return Array.from(this.visitedZones);
  }

  getMissingMandatoryZones(): string[] {
    if (!this.context) return [];
    
    // Filtrowanie stref z historycznych defektów (jeśli są krytyczne lub wysokie)
    const requiredZones = this.context.historical_defects
      .filter(d => d.urgency === 'Critical' || d.urgency === 'High')
      .map(d => d.loc.toLowerCase());

    const missing = requiredZones.filter(zone => {
      // Szukamy czy jakakolwiek odwiedzona strefa zawiera nazwę wymaganej strefy
      return !Array.from(this.visitedZones).some(visited => visited.includes(zone) || zone.includes(visited));
    });

    return [...new Set(missing)]; // Unikalne braki
  }

  /**
   * Generates dynamic checklist based on historical findings (Hard Extraction)
   */
  private generateDynamicChecklist(context: PreInspectionContext) {
    this.checklist = context.historical_defects.map(defect => ({
      pillar: this.mapPillarToNumber(defect.pillar),
      description: defect.desc,
      location: defect.loc,
      verification_question: defect.verification_question,
      status: 'pending',
      is_historical: true,
      is_mandatory: defect.urgency === 'High' || defect.urgency === 'Critical'
    }));

    this.complianceGaps = context.missing_compliance.map(item => ({
      item: item,
      issue: "Stwierdzony brak / wada formalna",
      status: 'missing'
    }));

    this.structuralAlerts = context.structural_alerts || [];
  }

  private mapPillarToNumber(pillar: string): number {
    const map: Record<string, number> = {
      "Fundamenty": 1,
      "Konstrukcja": 2,
      "Elewacja": 3,
      "Dach": 4,
      "Odwodnienie": 5,
      "Stolarka": 6,
      "Dodatki": 7,
      "Otoczenie": 8
    };
    return map[pillar] || 0;
  }

  /**
   * Builds a spatial dictionary for Whisper/Gemini synonyms
   */
  private buildSpatialDictionary(context: PreInspectionContext) {
    const dict: Record<string, string[]> = {};
    context.spatial_markers.forEach(marker => {
      // Basic normalization and synonyms
      const key = marker.toUpperCase();
      dict[key] = [marker, marker.toLowerCase(), `STREFA ${marker}`, `OBSZAR ${marker}`];
    });
    this.spatialSynonyms = dict;
  }

  getSpatialDictionary() {
    return this.spatialSynonyms;
  }

  /**
   * Helper to verify if the context has suspicious history (no stamp)
   */
  verifyProfessionalCredentials(aiResponse: any): boolean {
    // If the AI response doesn't mention a license number or verification info
    // This is called during the ingestion phase in InspectionModule
    const hasStamp = aiResponse.validation_error === null;
    return hasStamp;
  }
}

export const inspectionStore = new InspectionStore();
