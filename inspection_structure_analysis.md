# Building Inspection Structure Analysis

This document synthesizes findings from archival homeowner resources, professional legal templates, and the BimOS AI strategy to define the requirements for the AI-powered inspection module.

## 1. Documentation Sources Analyzed

| Source | Type | Focus | Key Value |
| :--- | :--- | :--- | :--- |
| `Awarie.pdf` | Archival | Common Home Failures | 10 critical points (roof, walls, HVAC, etc.) |
| `K-02 Template` | Professional | Legal Compliance | Art. 62 layout for buildings > 2000m² |
| `BimOS Strategy` | Strategic | AI Integration | "Data-driven" approach, analog tool digital twins |

## 2. Synthesized Inspection Schema (Construction Focused)

The module now focuses on the **architectural and structural** integrity, while installations are recorded as external protocol statuses.

### Phase B: Technical Assessment (8 Construction Pillars)
1. **Fundamenty i Piwnice**: Ściany fundamentowe, izolacje przeciwwilgociowe, posadzki piwnic.
2. **Konstrukcja Nośna**: Ściany nośne, słupy, podciągi, stropy.
3. **Ściany Zewnętrzne i Elewacja**: Tynki, okładziny, docieplenie, gzymsy, detale.
4. **Dach i Pokrycie**: Konstrukcja więźby, pokrycie, świetliki, wyłazy.
5. **Odwodnienie Obiektu**: Rynny, rury spustowe, izolacje tarasów, obróbki blacharskie.
6. **Stolarka i Ślusarka**: Okna (części wspólne), drzwi wejściowe, bramy, balustrady.
7. **Elementy Dodatkowe**: Reklamy, jednostki AC, anteny, maszty.
8. **Otoczenie i Zagospodarowanie**: Opaski, chodniki przy budynku, schody zewnętrzne, murki oporowe.

### Phase C: Review of Installation Protocols (Separate Section)
Instead of detailed assessment, we record the **validity and summary findings** of specialist protocols:
- **Instalacja Elektryczna i Odgromowa**: (Ważność, opis problemów).
- **Instalacja Gazowa**: (Ważność, opis problemów).
- **Przewody Kominowe (Spalinowe/Wentylacyjne)**: (Ważność, opis problemów).
- **Systemy ppoż.**: (Jeśli dotyczy).

## 3. Recommended AI Processing Workflow

1.  **Ingestion**: User uploads archival PDF or photos.
2.  **Mapping**: AI identifies which section (Pillars 1-8 or Protocols) the content belongs to.
3.  **Extraction**: 
    - For Pillars: AI pulls quantitative data and identifies defects.
    - For Protocols: AI pulls dates and "Valid/Invalid" status from archival signatures.
4.  **Verification**: AI flags "missing information" based on the Art. 62 template.
5.  **Drafting**: AI pre-fills the `InspectionModule` UI for human supervisor approval.

> [!IMPORTANT]
> The primary goal of the AI module will be to bridge the gap between "unstructured archival data" (old PDFs) and the "structured protocol requirements" (Art. 62) to ensure 100% legal compliance with minimal manual entry.
