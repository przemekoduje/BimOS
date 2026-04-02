# Kompleksowy Inżynierski Przewodnik po Systemie Cyfrowej Książki Obiektu Budowlanego (cKOB)

Poniższa baza wiedzy stanowi wyczerpujące kompendium prawno-techniczne dotyczące wdrażania i obsługi Cyfrowej Książki Obiektu Budowlanego (cKOB), opracowane na podstawie obowiązujących przepisów Prawa budowlanego (Rozdział 5d) oraz dokumentacji technicznej Głównego Urzędu Nadzoru Budowlanego (GUNB).

---

## 1. Graniczne terminy wdrożenia i zakładania cKOB

Zgodnie ze znowelizowanym Prawem budowlanym (PB), proces cyfryzacji Książki Obiektu Budowlanego podlega sztywnym ramom czasowym, a systemów (papierowego i cyfrowego) **nie wolno stosować równolegle ani mieszać** [1]. 

**Kluczowe daty i terminy wdrożenia:**
*   **Od 1 stycznia 2023 r.:** Pojawiła się możliwość dobrowolnego zakładania nowych książek w systemie cyfrowym (cKOB) [2]. Na system cyfrowy można przejść w każdej chwili, kiedy uznamy to za wygodniejsze [1].
*   **Od 1 stycznia 2024 r.:** Dla nowych obiektów budowlanych można założyć **tylko i wyłącznie** cyfrową książkę w systemie cKOB [2].
*   **Do 31 grudnia 2031 r.:** Bezwzględny obowiązek przeniesienia/założenia książki w systemie cKOB dla absolutnie **wszystkich** obiektów [1].

**Terminy na założenie KOB dla konkretnego obiektu (Art. 60c PB):**
Właściciel lub zarządca (WZ) ma obowiązek założyć cKOB w terminie **do 30 dni** od dnia:
*   Doręczenia decyzji o pozwoleniu na użytkowanie obiektu [3].
*   Dokonania skutecznego zawiadomienia o zakończeniu budowy (dla obiektów wymagających jedynie zawiadomienia) [3].
*   Dokonania zmiany sposobu użytkowania obiektu budowlanego, jeśli w wyniku tej zmiany obiekt zaczął podlegać obowiązkowi prowadzenia KOB [3].

**Terminy wpisów:**
*   Wpisu w cKOB należy dokonać niezwłocznie, **nie później niż w terminie 7 dni** od zaistnienia okoliczności (np. zakończenia kontroli) (Art. 60f) [4, 5].

---

## 2. Architektura Ról w Systemie – Kto odpowiada za cKOB?

W systemie teleinformatycznym cKOB pracują tzw. **interesariusze** – wyłącznie oni mają dostęp do systemu i uprawnienia do edycji lub wpisów [6, 7]. Wyróżniamy trzy główne role [6, 8]:

### A. Właściciel / Zarządca (WZ) lub Pełnomocnik
*   **Odpowiedzialność:** Faktyczny właściciel obiektu, zarządca lub osoba fizyczna posiadająca uprawnienia do ich reprezentowania (pełnomocnik) [6, 7].
*   **Uprawnienia:** To jedyna rola, która może **założyć** KOB w systemie oraz przekazać książkę kolejnemu właścicielowi [9, 10]. WZ odpowiada m.in. za założenie KOB, wyznaczenie osoby do prowadzenia KOB, bezpieczne przechowywanie dokumentów, udostępnianie KOB oraz zamknięcie KOB po ewentualnej rozbiórce obiektu [11]. WZ może zapraszać do systemu kolejne osoby (UPK i OPK) [10, 12].

### B. Osoba Uprawniona do Prowadzenia Książki (UPK)
*   **Odpowiedzialność:** Zgodnie z Art. 60d PB, WZ musi wskazać osobę fizyczną bezpośrednio odpowiedzialną za prowadzenie KOB [13]. To na tej osobie spoczywa bieżący ciężar utrzymania dokumentacji. Zgodnie ze stanowiskiem GUNB, UPK może być tylko jedna osoba fizyczna odpowiedzialna za całość (lub w przypadku wskazania kilku osób, należy prawnie określić odrębny zakres odpowiedzialności każdej z nich) [10, 14].
*   **Uprawnienia:** UPK ma te same uprawnienia co WZ z wyjątkami: **nie może zakładać książek, przekazywać ich nowym podmiotom ani zapraszać kolejnych UPK/WZ** [10, 12]. UPK odpowiada m.in. za terminowe dokonywanie wpisów oraz dodanie **planu sytuacyjnego obiektu**. Zgodnie z instrukcją, plan musi być pierwszym elementem po założeniu książki i zawierać: granice działki, usytuowanie obiektu, drogi dojazdowe (ppoż) oraz przyłącza i urządzenia przeciwpożarowe [11, 15, 16].

### C. Osoba Przeprowadzająca Kontrolę (OPK)
*   **Kim jest OPK?** To inżynier lub fachowiec posiadający odpowiednie uprawnienia: budowlaniec, elektryk, gazownik lub kominiarz [12, 17]. OPK wykonuje fizyczne przeglądy (roczne, półroczne, pięcioletnie) wynikające z art. 62 ust. 1 PB [6].
*   **Odpowiedzialność OPK w systemie:** Po wykonaniu kontroli, OPK ma **7 dni na wprowadzenie wpisu** do systemu (do tablicy nr III) [5]. Co kluczowe, w przypadku kontroli prowadzonych przez zespół, **każdy kontrolujący loguje się jako OPK i samodzielnie dokonuje wpisu w zakresie swoich uprawnień budowlanych**, a nie jedna osoba za wszystkich [18, 19].
*   **Baza uprawnień:** Aby funkcjonować w systemie jako OPK, interesariusz musi wprowadzić swoje uprawnienia budowlane w zakładce "Dane użytkownika". Dokonuje tego pobierając je z rządowego systemu **e-CRUB** lub wprowadzając numer uprawnień ręcznie wraz ze skanem (PDF, JPG) stosownej decyzji [12, 20, 21]. OPK posiada też wyłączne prawo do dokonywania wpisów w tablicach kontroli okresowych, do czego WZ i UPK nie mają praw [12, 18].

---

## 3. Aspekty Techniczne: Logowanie i Węzeł Krajowy (login.gov.pl)

*   **Pierwsze logowanie (Założenie konta):** Osoba fizyczna funkcjonująca jako interesariusz, w celu założenia konta, musi uwierzytelnić się w **Węźle Krajowym (login.gov.pl)** [22, 23]. System ten zapewnia integrację państwowych środków identyfikacji (Profil Zaufany, aplikacja mObywatel, e-dowód, lub bankowość elektroniczna) [22, 24].
*   **Identyfikator w systemie:** Przy zakładaniu konta należy podać prywatny adres e-mail, który staje się identyfikatorem/loginem. Powiązanie konta jest wyłączne i zabezpieczone przed osobami trzecimi. Użytkownik nie ma możliwości zmiany tego e-maila z poziomu aplikacji (wymaga to bezpośredniego kontaktu z GUNB) [25].
*   **Logowania kolejne:** Pierwsze logowanie ściśle weryfikuje tożsamość obywatela. Kolejne logowania mogą odbywać się tradycyjnie (poprzez E-mail i Hasło podane przy rejestracji), jednak domyślnie, **co 180 dni system cKOB prosi o ponowną autoryzację przez Węzeł Krajowy** w celach bezpieczeństwa [23, 26].

---

## 4. Zarządzanie Pełnomocnikami i Interesariuszami w Systemie

Proces udzielania dostępów i zapraszania pełnomocników (innych WZ, UPK, OPK lub służb) jest zautomatyzowany z poziomu aplikacji cKOB:
1.  **Wybór modułu:** WZ lub UPK wybiera z menu narzędziowego danej książki opcję **"Interesariusze KOB"**, a następnie przycisk **"DODAJ INTERESARIUSZA"** [27, 28].
2.  **Konfiguracja:** Należy podać adres e-mail zapraszanej osoby, przydzielaną jej rolę (np. OPK) oraz datę rozpoczęcia obowiązków [29, 30]. Na tym etapie opcjonalnie wpisuje się numer PESEL [29]. System umożliwia także nadanie **dostępu czasowego**, co powoduje samoistne odcięcie uprawnień po zadanej dacie [30-32].
3.  **Akceptacja przez e-mail/system:** Osoba zapraszana otrzymuje powiadomienie e-mail i powiadomienie systemowe (jeśli ma już konto). Musi zalogować się do systemu i nacisnąć przycisk **"Zatwierdź"** lub użyć opcji "Przyjęcie roli" w interfejsie cKOB [33-40]. Odrzucenie zaproszenia również jest rejestrowane w logach systemowych [41]. 
4.  Dopóki zaproszona osoba nie potwierdzi objęcia obowiązków, figuruje w tabeli systemu na czerwono bez nadanej daty akceptacji [42, 43].

---

## 5. Rola i funkcjonowanie organów państwowych (PINB)

Powiatowy Inspektor Nadzoru Budowlanego (PINB) stanowi nadrzędny organ kontrolny [44, 45]. Interakcja z PINB na platformie cKOB wygląda następująco:

*   **Nadawanie dostępów organom:** Właściciel/Zarządca może udostępnić książkę do stałego lub czasowego wglądu inspektorom. Używa się do tego dedykowanej funkcji **"DODAJ PRZEDSTAWICIELA ORGANU ADMINISTRACJI"**, wybierając odpowiedni PINB z listy rozwijanej [46-48].
*   **Powiadomienia (Art. 62b ust 2):** W przypadku przeprowadzania kontroli obiektu wielkopowierzchniowego (np. pow. zabudowy >2000 m2 lub dachu >1000 m2), **OPK w ciągu 7 dni od zakończenia kontroli, musi zawiadomić PINB bezpośrednio poprzez moduł cKOB** (funkcja "Wyślij zawiadomienie o kontroli") [5, 49, 50].
*   **Raportowanie nieprawidłowości (Zagrożenie Bezpieczeństwa - Art 70 PB):** W sytuacji, gdy OPK stwierdzi uchybienia stwarzające zagrożenie (Art. 70 PB), musi poprzez opcję **"Wyślij protokół z kontroli"** w systemie, bezzwłocznie przesłać wygenerowany raport do właściwego Inspektoratu Nadzoru [51, 52]. Administratorzy organów NB (Inspektoratów) muszą wcześniej skonfigurować w systemie swój służbowy e-mail do odbioru tych zgłoszeń; brak takiej konfiguracji blokuje wysyłkę zawiadomienia i generuje wezwanie systemowe do PINB o uzupełnienie danych [53-56].

---

## 6. System Kary i Mandatów (Twarde Scenariusze Prawno-Karne)

W nowym rygorze prawnym (PB oraz Kodeks Wykroczeń - KW), naruszenie obowiązków obsługi cKOB wyzwala konsekwencje karne bezpośrednio dla WZ, UPK lub OPK:

### A. Kary z tytułu niespełnienia obowiązków przez WZ/UPK (Art. 93 pkt 9 PB)
Sankcje w postaci grzywny dotyczą osób, które nie realizują ustawowych obowiązków. Właściciel, Zarządca lub Osoba Uprawniona do Prowadzenia Książki ponosi karę m.in. za:
*   Niezałożenie nowej cKOB w 30-dniowym terminie [3, 11].
*   Brak wskazania fizycznej osoby odpowiedzialnej za prowadzenie KOB [11].
*   Nieprzekazanie KOB w przypadku zmiany właściciela [11].
*   Niedotrzymywanie ustawowych (7-dniowych) terminów dokonywania wpisów w księgach [4, 11].
*   Nieudostępnienie książki służbom kontrolnym [11].

### B. Kary dla Inżynierów i Fachowców / OPK (Art. 93 pkt 8 PB)
Osoba fizyczna z uprawnieniami (OPK) podlega **karze grzywny**, jeżeli w terminie **7 dni od daty zakończenia kontroli**:
*   Nie wprowadzi wymaganego prawnie wpisu do cyfrowego systemu cKOB [5, 57].
*   Zignoruje obowiązek elektronicznego powiadomienia PINB o kontroli obiektu wielkopowierzchniowego [57].

### C. Narzędzia organów kontroli – System Mandatowy (Art. 94 i 95 PB)
Mechanizm karania jest błyskawiczny:
*   Przepisy Art. 93 egzekwowane są na podstawie przepisów **Kodeksu postępowania w sprawach o wykroczenia** [58].
*   Uprawnieni pracownicy organów nadzoru budowlanego (Inspektorzy) korzystają z tzw. trybu mandatowego [58].
*   **Twarde Kwoty:** Pojedyncze wykroczenie w zakresie książki wycenione jest na **maksymalnie 500 PLN**, podczas gdy zbieg dwóch lub więcej uchybień pozwala nałożyć karę grzywny z mandatu do wysokości **1000 PLN** (Art. 9 § 1 Kodeksu Wykroczeń) [58]. Decyzja o wysokości mandatu jest w kompetencji indywidualnej oceny Inspektora [59].
*   **Przedawnienie (Ustanie Karalności - Art. 45 § 1 KW):** Mandat można nałożyć do roku od popełnienia wykroczenia (czyli np. niedokonania wpisu na czas). Jednak, jeżeli w ciągu tego roku zostanie wszczęte oficjalne postępowanie, karalność zjawiska wygasa dopiero po 2 latach od daty zakończenia owego pierwszego roku [60].

### D. Fałszerstwo informatyczne (Art. 65 § 1 KW)
Użytkownicy, w tym pełnomocnicy wprowadzający informacje, muszą zachować rzetelność danych profilowych. *Umyślne wprowadzenie w błąd* organów państwowych, np. podanie nieprawdziwych danych tożsamości, peselu lub fałszywych uprawnień zawodowych/miejsca pracy w procesie uwierzytelniania państwowego (Węzeł Krajowy / cKOB) podlega odrębnym karom ograniczenia wolności lub grzywny [61].

---

## 7. Integralność Danych – "Mięso" Techniczne i Tablice KOB

### Szczegółowy Wykaz Tablic (Quick Reference):
*   **Tablica I:** Dane identyfikacyjne obiektu (adres, numer działki, funkcja).
*   **Tablica II:** Dane właściciela i zarządcy.
*   **Tablica III:** Protokół kontroli okresowych (główny obszar pracy OPK).
*   **Tablica IV:** Roboty budowlane w obiekcie po oddaniu do użytkowania.
*   **Tablica V:** Katastrofy budowlane.
*   **Tablica VI:** Decyzje, postanowienia i inne akty organów (np. nakazy PINB).
*   **Tablica VII:** Dokumentacja techniczna i ekspertyzy.
*   **Tablica VIII:** Wykaz osób upoważnionych do prowadzenia książki.

### Logika Obsługi Systemu:
*   **Status "Wpisu w toku" (Wersja robocza):** System cKOB umożliwia zapisanie wpisu jako "Wersja robocza". Jest ona widoczna wyłącznie dla autora i nie wywołuje skutków prawnych. Dopiero kliknięcie **"ZATWIERDŹ"** formalizuje wpis, czyni go widocznym dla innych uprawnionych i uruchamia ustawowy termin 30 dni na ewentualną korektę.
*   **Zasada Trwałości (Blockchain-like audit trail):** System posiada wbudowane algorytmy zabezpieczające zapewniające rozliczalność (kto, co i kiedy wpisał). **Żadnych danych, które zostały wprowadzone i zatwierdzone do systemu cKOB, nie można fizycznie z niego usunąć** (Art. 60h ust 6) [70]. 
 Wpisy pozostają w systemie przez czas istnienia obiektu, a kasowane są automatycznie dopiero po upływie **10 lat od momentu zamknięcia** KOB (np. wskutek rozbiórki obiektu) [17]. System daje również możliwość walidacji kryptograficznej wygenerowanych plików PDF (sumy kontrolne/hashe dokumentu), dzięki czemu można sprawdzić autentyczność wydruku organom nadzoru [71-75].
*   **Edycja i Anulowanie:** Jeśli we wpisie pojawi się błąd inżynierski:
    *   Korekt i zmian dla tablic 3, 4, 5, 6, 7 i 8 może dokonywać **wyłącznie autor danego wpisu** [76].
    *   Osoba dokonująca kontroli (OPK) jest objęta specjalnym reżimem limitu czasowego – **system c-KOB zablokuje możliwość korekty bądź edycji własnego wpisu po upływie zaledwie 30 dni od jego dokonania** [76-78]. W przypadku anulowania lub korekty wpisu po czasie, w systemie odkłada się wpis "anulowany" pokreślony kolorem pomarańczowym i na zawsze widoczny z zaznaczeniem, co uległo korekcie [79-82].
*   **Wielkość Plików (Załączniki):** Akceptowane rozszerzenia to m.in. `pdf, jpg, tif, zip, png`. Zaimplementowano sztywne ograniczenie wagi każdego z załączanych plików – **maksymalnie 5 MB** [83]. Przy załączaniu dokumentów zewnętrznych (np. potwierdzenia uprawnień z e-CRUB), system wymaga podania numeru dokumentu oraz dokładnej daty jego wydania.