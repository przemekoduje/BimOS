# TCB: Biblia Warunków Technicznych Przeglądów

Ten dokument stanowi fundament wiedzy dla silnika AI modułu BimOS. AI korzysta z tych definicji, aby interpretować dokumenty archiwalne, zdjęcia i filmy.

---

## 🏗️ 1. KONSTRUKCJA I ELEMENTY ZEWNĘTRZNE (Art. 62 pkt 2)

### 1.1 Ściany Zewnętrzne i Elewacje
- **Punkt Kontrolny**: Tynki i okładziny.
  - **Wzorzec Awarii**: Odspojenia, pęknięcia skurczowe, zawilgocenia (plamy).
  - **Warunek Techniczny**: Brak pęknięć > 2mm; brak ubytków zagrażających odpadnięciem.
- **Punkt Kontrolny**: Gzymsy i attyki.
  - **Wzorzec Awarii**: Poluzowane obróbki blacharskie, zaciski.
  - **Warunek Techniczny**: Sztywne zamocowanie, drożność odpływów.

### 1.2 Struktura Nośna
- **Punkt Kontrolny**: Zarysowania ścian i stropów.
  - **Krytyczne (>5mm)**: Wymagana natychmiastowa ekspertyza (Pillar C).
  - **Norma**: PN-B-03264:2002.

---

## 💧 2. DACH I ODWODNIENIE

### 2.1 Pokrycie Dachowe
- **Punkt Kontrolny**: Szczelność (Awarie.pdf pkt 1).
  - **Wzorzec Awarii**: Wywinięcia papy, pęknięcia dachówek, nieszczelne kosze.
- **Punkt Kontrolny**: Odwodnienie (Rynny/Rury).
  - **Warunek Techniczny**: Spadek min. 1%, brak osadów, drożność czyszczaków.

---

## 🔥 3. INSTALACJE I BEZPIECZEŃSTWO

### 3.1 Instalacja Gazowa (Art. 62 ust. 1 pkt 4)
- **Punkt Kontrolny**: Szczelność połączeń.
  - **Metoda AI**: Rozpoznawanie wskazań manometrów analogowych na zdjęciach.
- **Punkt Kontrolny**: Przewody kominowe.
  - **Warunek**: Drożność, brak pęknięć w czopuchu.

### 3.2 Wentylacja
- **Punkt Kontrolny**: Ciąg powietrza (Awarie.pdf pkt 6).
  - **Wzorzec Awarii**: Pleśń w narożnikach (niedostateczna wymiana), parowanie szyb.

---

## 📊 4. SKALA OCENY STANU TECHNICZNEGO

| Ocena | Znaczenie | Akcja Systemowa |
| :--- | :--- | :--- |
| **ST1** | Stan Dobry | Brak zaleceń. |
| **ST2** | Stan Zadowalający | Naprawy bieżące / konserwacja. |
| **ST3** | Stan Nieodpowiedni | Wymagany remont; AI generuje listę robót. |
| **ST4** | Stan Awaryjny | **ALARM**: Zagrożenie życia; powiadomienie PINB. |

---

> [!NOTE]
> Dodawaj nowe punkty kontrolne zachowując strukturę `### Tytuł`. 
> Możesz wklejać tutaj surowy tekst z norm, a ja (AI) uporządkuję go przy następnej sesji.
