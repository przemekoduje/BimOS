# Building Inspection Structure Analysis

This document synthesizes findings from archival homeowner resources, professional legal templates, and the BimOS AI strategy to define the requirements for the AI-powered inspection module.

## 1. Documentation Sources Analyzed

| Source | Type | Focus | Key Value |
| :--- | :--- | :--- | :--- |
| `Awarie.pdf` | Archival | Common Home Failures | 10 critical points (roof, walls, HVAC, etc.) |
| `K-02 Template` | Professional | Legal Compliance | Art. 62 layout for buildings > 2000m² |
| `BimOS Strategy` | Strategic | AI Integration | "Data-driven" approach, analog tool digital twins |

## 2. Synthesized Inspection Schema (AI-Ready)

The AI engine will be trained/prompted to extract and categorize data from archival PDFs (and future media) into the following professional structure:

### Phase A: Metadata & Historical Context
- **Control Scope**: Previous recommendations status, legal basis (Art. 62).
- **Object Context**: Structural type (steel, masonry, etc.), installation equipment.
- **Archive Link**: Mapping findings to previous protocol IDs/dates.

### Phase B: Technical Assessment (8 Core Pillars)
1. **External Envelopes**: Plasters, claddings, external wall elements (balconies, gzymsy).
2. **Structural Integrity**: Cracks (>5mm), settlement indicators, wall/roof attachments.
3. **Roofing & Drainage**: Cover status, chimneys, gutters, flashings.
4. **Sanitary & Environmental**: Sewage, drainage, filter systems, noise reduction.
5. **Gas Systems**: Safety checks, leak detection.
6. **Chimney & Ventilation**: Gravity vs. mechanical, industrial chimneys.
7. **Installations**: Electrical, heating, plumbing (based on `Awarie.pdf` logic).
8. **Exterior Elements**: Advertisements, AC units, antennas.

### Phase C: Results & Strategic Action
- **Repair Schedule**: Recommended works prioritized by safety/cost.
- **Safety Conclusion**: 6-level scale (from "safe" to "immediate demolition").
- **Evidence Management**: Mapping photos/videos to specific protocol sections.

## 3. Recommended AI Processing Workflow

1.  **Ingestion**: User uploads archival PDF or photos.
2.  **Mapping**: AI identifies which section (Pillars 1-8) the content belongs to.
3.  **Extraction**: AI pulls quantitative data (dimensions, dates) and qualitative (status).
4.  **Verification**: AI flags "missing information" based on the Art. 62 template.
5.  **Drafting**: AI pre-fills the `InspectionModule` UI for human supervisor approval.

> [!IMPORTANT]
> The primary goal of the AI module will be to bridge the gap between "unstructured archival data" (old PDFs) and the "structured protocol requirements" (Art. 62) to ensure 100% legal compliance with minimal manual entry.
