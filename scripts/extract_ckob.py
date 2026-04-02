import os
import re
import sys

# Define the user's Python site-packages directory
user_site_packages = r"C:\Users\Admin\AppData\Roaming\Python\Python311\site-packages"
if user_site_packages not in sys.path:
    sys.path.append(user_site_packages)

try:
    import pdfplumber
except ImportError as e:
    print(f"Error: Could not import pdfplumber. {e}")
    sys.exit(1)

# Paths
DOCS_DIR = r"c:\Users\Admin\Desktop\przemokoduje\kodowanie\BimOS\ai-construction-assistant\docs\cKOB"
OUTPUT_PATH = r"c:\Users\Admin\Desktop\przemokoduje\kodowanie\BimOS\ai-construction-assistant\src\knowledge_base\cKOB_biblia.md"

FILES = [
    "c-KOB_Instrukcja dla osoby przeprowadzającej kontrole.pdf",
    "c-KOB_Instrukcja dla osoby prowadzącej książkę.pdf",
    "Materiały szkoleniowe 31032026.pdf"
]

# User requested technical nuances
USER_NUANCES = """
## DODATEK: KLUCZOWE MAPOWANIA I LOGIKA SYSTEMOWA (Wymagane dla Agenta AI)

### Szczegółowy Wykaz Tablic (Quick Reference):
*   **Tablica I:** Dane identyfikacyjne obiektu (adres, numer działki, funkcja).
*   **Tablica II:** Dane właściciela i zarządcy.
*   **Tablica III:** Protokół kontroli okresowych (to tutaj OPK spędza 90% czasu).
*   **Tablica IV:** Roboty budowlane w obiekcie po oddaniu do użytkowania.
*   **Tablica V:** Katastrofy budowlane.
*   **Tablica VI:** Decyzje, postanowienia i inne akty organów (np. nakazy PINB).
*   **Tablica VII:** Dokumentacja techniczna i ekspertyzy.
*   **Tablica VIII:** Wykaz osób upoważnionych do prowadzenia książki.

### Procedura "Planu Sytuacyjnego" (Sekcja 2.B):
Instrukcja UPK kładzie duży nacisk na to, że plan sytuacyjny musi być pierwszym elementem po założeniu książki. Musi on zawierać: 
*   Granice działki.
*   Usytuowanie obiektu.
*   Drogi dojazdowe (ppoż).
*   Przyłącza i urządzenia przeciwpożarowe.

### Logika "Wpisu w toku" (Techniczne):
System cKOB pozwala na zapisanie **"Wersji roboczej"** (Wpis w toku). 
*   Jest ona widoczna wyłącznie dla autora.
*   Nie stanowi formalnego wpisu w rozumieniu prawa.
*   Dopiero kliknięcie **"ZATWIERDŹ"** generuje skutki prawne, czyni wpis publicznym dla uprawnionych i uruchamia licznik 30 dni na korektę.

### Wymagania dla plików (Załączniki):
System narzuca limit **5 MB** na plik. Przy załączaniu dokumentów zewnętrznych (np. potwierdzenia uprawnień z e-CRUB), system wymaga podania:
1.  Numeru dokumentu.
2.  Daty wydania dokumentu.
"""

def clean_and_format_text(text):
    if not text:
        return ""
    
    # 1. Remove repeating footers/headers
    text = re.sub(r'Strona \d+ z \d+', '', text)
    text = re.sub(r'Strona \d+', '', text)
    text = re.sub(r'Główny Urząd Nadzoru Budowlanego', '', text)
    text = re.sub(r'GUNB', '', text)

    # 2. Normalize terminology
    text = re.sub(r'\bopk\b', 'OPK', text, flags=re.IGNORECASE)
    text = re.sub(r'\bupk\b', 'UPK', text, flags=re.IGNORECASE)
    text = re.sub(r'\bwz\b', 'WZ', text, flags=re.IGNORECASE)

    # 3. Transform long paragraphs into bullet points
    def to_bullets(match):
        p = match.group(0).strip()
        lines = [l.strip() for l in p.split('. ') if l.strip()]
        if len(lines) > 3:
            return '\n'.join([f"- {line}." for line in lines])
        return p

    text = re.sub(r'\n([A-Z].{200,})\s*\n', to_bullets, text)
    
    return text

def table_to_markdown(table):
    if not table: return ""
    md = ""
    # Clean up cells (remove newlines within cells)
    clean_table = []
    for row in table:
        clean_row = [str(cell).replace('\n', ' ').strip() if cell else "" for cell in row]
        clean_table.append(clean_row)
    
    if not clean_table: return ""
    
    # Header
    md += "| " + " | ".join(clean_table[0]) + " |\n"
    md += "| " + " | ".join(["---"] * len(clean_table[0])) + " |\n"
    
    # Body
    for row in clean_table[1:]:
        md += "| " + " | ".join(row) + " |\n"
    
    return md + "\n"

def process_file(file_path):
    all_text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            # Extract text
            page_text = page.extract_text()
            all_text += clean_and_format_text(page_text) + "\n"
            
            # Extract tables
            tables = page.extract_tables()
            for table in tables:
                all_text += "\n### Tabela:\n"
                all_text += table_to_markdown(table)
    
    return all_text

def main():
    print("Starting c-KOB Knowledge Extraction Pipeline...")
    full_biblia = "# BIBLIA C-KOB - Kompendium Wiedzy Technicznej i Prawnej\n\n"
    full_biblia += "> [!IMPORTANT]\n> Dokument wygenerowany automatycznie przez pipeline AI BimOS. Zawiera ustrukturyzowane procedury c-KOB.\n\n"

    for file_name in FILES:
        print(f"Processing: {file_name}...")
        path = os.path.join(DOCS_DIR, file_name)
        if not os.path.exists(path):
            print(f"Warning: {path} not found.")
            continue
        
        full_biblia += f"\n---\n<!-- SOURCE: {file_name} -->\n"
        full_biblia += f"## Źródło: {file_name}\n\n"
        full_biblia += process_file(path)
        full_biblia += "\n"

    # Append user nuances
    full_biblia += "\n" + USER_NUANCES

    # Final cleanup
    full_biblia = re.sub(r'\n{3,}', '\n\n', full_biblia)

    # Save
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write(full_biblia)
    
    print(f"Pipeline complete! Saved to {OUTPUT_PATH}")

if __name__ == "__main__":
    main()
