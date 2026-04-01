import fitz
import os

dir_path = 'docs/cKOB'
out_path = 'src/knowledge_base/cKOB.md'

os.makedirs(os.path.dirname(out_path), exist_ok=True)

with open(out_path, 'w', encoding='utf-8') as f_out:
    f_out.write('# BIBLIA cKOB (Pełna Ekstrakcja z Dokumentacji)\n\n')
    for file in os.listdir(dir_path):
        if file.endswith('.pdf'):
            path = os.path.join(dir_path, file)
            print(f"Ekstrakcja: {file}...")
            f_out.write(f'## Dokument: {file}\n\n')
            
            try:
                doc = fitz.open(path)
                for page in doc:
                    text = page.get_text()
                    if text:
                        f_out.write(text + '\n')
                doc.close()
                f_out.write('\n\n---\n\n')
            except Exception as e:
                print(f"Błąd czytania {file}: {e}")

print(f'\nGOTOWE! Zapisano do {out_path}')
