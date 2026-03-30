/**
 * Valuation Service
 * Implements architectural valuation and technical wear methodologies (Rossa & Weighted Average)
 * @author Senior Dev
 */

export interface ComponentUsage {
  name: string;
  share: number; // Ai - kosztowy udział elementu w obiekcie (%)
  wear: number;  // Si - stopień zużycia elementu (%)
}

export interface RossaParams {
  age: number;        // t - wiek budynku w latach
  durability: number; // T - przewidywana trwałość w latach
}

export interface ValuationResult {
  rossaScore: number;
  weightedScore: number;
  finalScore: number;
  conditionScale: 'Dobry' | 'Zadowalający' | 'Średni' | 'Zły' | 'Awaryjny';
}

/**
 * Normative durability values (T) based on PIIB standards (simplified table)
 */
export const DURABILITY_TABLE = {
  FUNDAMENTY: 200,
  KONSTRUKCJA_NOSNA: 150,
  SCIANY_ZEWNETRZNE: 100,
  DACH_I_POKRYCIE: 70,
  ODWODNIENIE: 25,
  STOLARKA: 40,
  ELEMENTY_DODATKOWE: 30,
  OTOCZENIE: 20,
  TYNKI_WEWNETRZNE: 25,
  PODLOGI_POSADZKI: 20,
} as const;

/**
 * Default cost participation (Ai) for each of the 8 pillars (%)
 * Values based on common technical standards for residential buildings.
 */
export const PILLAR_WEIGHTS: Record<number, number> = {
  1: 10, // Fundamenty
  2: 40, // Konstrukcja Nośna
  3: 15, // Ściany Zewnętrzne
  4: 10, // Dach
  5: 5,  // Odwodnienie
  6: 10, // Stolarka
  7: 5,  // Elementy Dodatkowe
  8: 5   // Otoczenie
};

/**
 * Calculates technical wear using the Rossa Methodology
 * S_zt = (t * (t + T)) / (2 * T^2) * 100
 */
export function calculateRossaWear(params: RossaParams): number {
  const { age, durability } = params;
  if (age >= durability) return 100;
  
  const score = (age * (age + durability)) / (2 * Math.pow(durability, 2));
  return Math.round(score * 10000) / 100; // Return with 2 decimal places as percentage
}

/**
 * Calculates technical wear using the Weighted Average Method
 * S_w = Sum(Ai * Si) / 100
 */
export function calculateWeightedWear(components: ComponentUsage[]): number {
  const sumProduct = components.reduce((acc, comp) => acc + (comp.share * comp.wear), 0);
  const totalShare = components.reduce((acc, comp) => acc + comp.share, 0);
  
  if (totalShare === 0) return 0;
  return Math.round((sumProduct / totalShare) * 100) / 100;
}

/**
 * Maps percentage to PIIB 5-step scale
 */
export function mapToConditionScale(score: number): ValuationResult['conditionScale'] {
  if (score <= 15) return 'Dobry';
  if (score <= 30) return 'Zadowalający';
  if (score <= 50) return 'Średni';
  if (score <= 70) return 'Zły';
  return 'Awaryjny';
}

/**
 * Core valuation engine integrating both methods
 */
export function performFullValuation(
  rossa: RossaParams, 
  components: ComponentUsage[]
): ValuationResult {
  const rScore = calculateRossaWear(rossa);
  const wScore = calculateWeightedWear(components);
  
  // Final score is the arithmetic mean
  const finalScore = Math.round(((rScore + wScore) / 2) * 100) / 100;
  
  return {
    rossaScore: rScore,
    weightedScore: wScore,
    finalScore,
    conditionScale: mapToConditionScale(finalScore)
  };
}
