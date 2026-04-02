# BIBLIA C-KOB - Kompendium Wiedzy Technicznej i Prawnej

> [!IMPORTANT]
> Dokument wygenerowany automatycznie przez pipeline AI BimOS. Zawiera ustrukturyzowane procedury c-KOB.

---
<!-- SOURCE: c-KOB_Instrukcja dla osoby przeprowadzającej kontrole.pdf -->
## Źródło: c-KOB_Instrukcja dla osoby przeprowadzającej kontrole.pdf

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Instrukcja użytkownika
System c-KOB
wersja dla osoby
przeprowadzającej kontrole (OPK)
Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Spis treści
SŁOWNIK RÓL UŻYTKOWNIKÓW ........................................................................................................... 3
1. WSTĘP ................................................................................................................................... 4
1.1 Cel dokumentu ........................................................................................................................ 4
1.2 Struktura dokumentu .............................................................................................................. 4
2. OPIS APLIKACJI ......................................................................................................................... 4
3. FUNKCJE APLIKACJI .................................................................................................................... 5
3.1 Strona startowa ....................................................................................................................... 5
3.2 Rejestracja konta użytkownika ................................................................................................ 6
3.2.1 Rejestracja konta interesariusza ..................................................................................... 6
3.3 Logowanie do Systemu ............................................................................................................ 8
3.3.1 Logowanie do Systemu za pośrednictwem Węzła Krajowego (WK)................................ 8
3.3.2 Logowanie do Systemu za pośrednictwem konta c-KOB ................................................. 8
3.3.3 Wylogowanie z Systemu .................................................................................................. 9
3.4 Wybór roli .............................................................................................................................. 10
3.5 Rejestr KOB ............................................................................................................................ 10
3.5.1 Przeglądanie rejestru KOB ............................................................................................. 10
3.5.2 Filtrowanie danych ........................................................................................................ 13
3.5.3 Podgląd metryki KOB ..................................................................................................... 14
3.5.4 Informacje o obiekcie budowlanym ............................................................................... 17
3.5.5 Dane o właścicielu i zarządcy ........................................................................................ 20
3.5.6 Interesariusze KOB ......................................................................................................... 22
3.5.7 Wpisy do Książki obiektu budowlanego ........................................................................ 34
3.5.8 Wyślij zawiadomienie o przeprowadzonej kontroli ....................................................... 41
3.5.9 Wyślij protokół z kontroli ............................................................................................... 44
3.5.10 Eksport zestawień do pliku ............................................................................................ 47
3.5.11 Eksport KOB do pliku PDF .............................................................................................. 48
3.5.12 Weryfikacja sumy kontrolnej ......................................................................................... 50
3.6 Raporty .................................................................................................................................. 52

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.7 Profil użytkownika ................................................................................................................. 54
3.7.1 Powiadomienia .............................................................................................................. 55
3.7.2 Dane użytkownika ......................................................................................................... 58
Słownik ról użytkowników
Role użytkowników Systemu c-KOB:
• Administrator,
• Lokalny administrator,
• Przedstawiciel Nadzoru Budowlanego,
• Przedstawiciel organu innego niż Nadzór Budowlany lub służb uprawnionych do kontroli
przestrzegania przepisów w zakresie utrzymania obiektów budowlanych lub do prowadzenia
działań ratowniczych,
• Interesariusz KOB:
o Właściciel/zarządca bądź osoba uprawniona do reprezentowania właściciela/zarządcy
(WZ),
o Osoba upoważniona do prowadzenia KOB (UPK),
o Osoba przeprowadzająca kontrole (OPK).

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
1. Wstęp
Niniejszy dokument stanowi Podręcznik użytkownika do Systemu Cyfrowej Książki Obiektu
Budowlanego (System c-KOB).
1.1 Cel dokumentu
Celem dokumentu jest prezentacja sposobu użytkowania Systemu Cyfrowej Książki Obiektu
Budowlanego.
1.2 Struktura dokumentu
Niniejszy dokument obejmuje:
• Rozdział 1 Wstęp – opis celu i struktury dokumentu.
• Rozdział 2 Opis aplikacji – ogólny opis aplikacji, tj. przeznaczenie, zadania, które można
realizować przy jej pomocy, rodzaje użytkowników aplikacji itp.
• Rozdział 3 Funkcje aplikacji – opis przeznaczenia i działania poszczególnych funkcji Systemu.
Wskazanie najważniejszych elementów potrzebnych do prawidłowego działania
funkcjonalności. Całość dopełniają zrzuty ekranowe z Systemu.
2. Opis aplikacji
System Cyfrowej Książki Obiektu Budowlanego przeznaczony jest do prowadzenia książki obiektu
budowlanego w postaci cyfrowej.
Cyfrowa Książka Obiektu Budowlanego (CKOB) zakładana jest przez właściciela/zarządcę bądź osobę
uprawnioną do reprezentowania właściciela/zarządcy obiektu budowlanego, po uprzednim
utworzeniu konta w Systemie, bez udziału organów administracji publicznej.
System c-KOB jest dostępny do bezpłatnego i powszechnego użytkowania. Odbiorcami usług będą:
• przedstawiciele organów nadzoru budowlanego (PINB, WINB, GINB);
• przedstawiciele służb takich jak: Policja, Państwowa Straż Pożarna, prokuratura, inspekcja
sanitarna, ochrona zabytków, itp.;
• właściciele/zarządcy bądź osoby uprawnione do reprezentowania właścicieli/zarządców
obiektów budowlanych (WZ);
• osoby upoważnione do prowadzenia danej CKOB (UPK),
• osoby przeprowadzające kontrole danego obiektu budowlanego (OPK).

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3. Funkcje aplikacji
W niniejszej części zamieszczone zostały opisy funkcji oraz sposób działania narzędzi dostępnych dla
użytkowników c-KOB.
3.1 Strona startowa
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
Strona startowa Cyfrowej Książki Obiektu Budowlanego jest dostępna pod adresem
https://c-kob.gunb.gov.pl/. Znajdują się na niej podstawowe oraz bieżące informacje dotyczące
Systemu c-KOB oraz Książki Obiektu Budowlanego (KOB).
Z tego miejsca można rozpocząć pracę z książką obiektu budowlanego rejestrując i logując się
w Systemie c-KOB.
Strona startowa Systemu c-KOB

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.2 Rejestracja konta użytkownika
3.2.1 Rejestracja konta interesariusza
Funkcjonalność aplikacji dostępna dla użytkowników w roli: interesariusz KOB.
Rejestracja służy do zakładania nowego konta użytkownika Systemu.
Uwaga! Osoby fizyczne funkcjonujące jako użytkownicy-interesariusze KOB logując się do Systemu c-KOB po raz pierwszy
muszą to zrobić za pośrednictwem Krajowego Węzła Identyfikacji Elektronicznej (WK) – ma to na celu potwierdzenie
tożsamości. Kolejne logowania mogą być już wykonywane za pośrednictwem panelu logowania Systemu c-KOB.
Domyślnie, po upływie 180 dni od ostatniego logowania do Systemu za pośrednictwem WK, System c-KOB poprosi
o ponowne logowanie przez WK w celu ponownej weryfikacji tożsamości.
W celu założenia konta interesariusza należy uruchomić https://c-kob.gunb.gov.pl/ i wykonać
następujące kroki:
1. Kliknąć przycisk znajdujący się w prawym górnym rogu portalu c-KOB.
2. W wyświetlonym oknie logowania należy kliknąć przycisk Zaloguj się Węzłem Krajowym.
W wyniku kliknięcia otwarta zostanie strona logowania Węzła Krajowego.
3. Następnie zalogować się jednym ze sposób logowania dostępnych w Węźle Krajowym:
Logowanie poprzez Węzeł Krajowy
4. Poprawnie przeprowadzona autoryzacja użytkownika w Węźle Krajowym spowoduje zwrotne
przekierowanie użytkownika do strony c-KOB oraz wyświetlenie okna, w którym należy podać
adres e-mail, który pełnić będzie rolę identyfikatora użytkownika w Systemie oraz służyć do
logowania się do Systemu (login) oraz komunikacji w ramach procesów związanych z obsługą
CKOB, następnie należy podać hasło do logowania do konta użytkownika w Systemie c-KOB
oraz zatwierdzić ewentualne wymagane oświadczenia, regulaminy i zgody (w postaci
checkboxów).

### Tabela:
| Uwaga! Osoby fizyczne funkcjonujące jako użytkownicy-interesariusze KOB logując się do Systemu c-KOB po raz pierwszy |
| --- |
| muszą to zrobić za pośrednictwem Krajowego Węzła Identyfikacji Elektronicznej (WK) – ma to na celu potwierdzenie |
| tożsamości. Kolejne logowania mogą być już wykonywane za pośrednictwem panelu logowania Systemu c-KOB. |
| Domyślnie, po upływie 180 dni od ostatniego logowania do Systemu za pośrednictwem WK, System c-KOB poprosi |
| o ponowne logowanie przez WK w celu ponownej weryfikacji tożsamości. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Potwierdzenie danych w procesie rejestracji konta użytkownika interesariusza
5. Proces rejestracji konta należy zakończyć klikając przycisk Potwierdź email, po czym System
automatycznie dokona pierwszego zalogowania użytkownika oraz przekierowania w Systemie
c-KOB do modułu Rejestr KOB (nie jest konieczna dodatkowa aktywacja konta).
W przypadku wprowadzenia adresu e-mail, który funkcjonuje już w Systemie c-KOB jako przypisany do innego konta
użytkownika, System c-KOB wyświetli komunikat o treści: Podany adres e-mail został już przypisany do innego konta
użytkownika i nie może zostać wykorzystany ponownie.
Komunikat wskazujący na ponowne użycie już zarejestrowanego adresu e-mail

### Tabela:
| W przypadku wprowadzenia adresu e-mail, który funkcjonuje już w Systemie c-KOB jako przypisany do innego konta |
| --- |
| użytkownika, System c-KOB wyświetli komunikat o treści: Podany adres e-mail został już przypisany do innego konta |
| użytkownika i nie może zostać wykorzystany ponownie. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.3 Logowanie do Systemu
3.3.1 Logowanie do Systemu za pośrednictwem Węzła Krajowego (WK)
Funkcjonalność aplikacji dostępna dla użytkowników w roli: interesariusz KOB.
Aby korzystać z funkcjonalności dostępnych dla zalogowanych użytkowników konieczne jest
zalogowanie do Systemu c-KOB.
W celu logowania do Systemu c-KOB przez Węzeł Krajowy należy wykonać następujące kroki:
1. Uruchomić Portal Systemu c-KOB, kliknąć przycisk znajdujący się w prawym
górnym rogu strony głównej portalu.
2. W wyświetlonym oknie logowania należy kliknąć przycisk Zaloguj się Węzłem Krajowym,
następnie zalogować się jednym ze sposób logowania dostępnych w ramach Węzła Krajowego.
Logowanie poprzez proxy Węzła Krajowego
3. Jeśli poprawnie zweryfikowano uprawnienia użytkownika zostanie on zalogowany do Systemu,
w przeciwnym razie wyświetlony zostanie komunikat o braku uprawnień.
3.3.2 Logowanie do Systemu za pośrednictwem konta c-KOB
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
Aby korzystać z funkcjonalności dostępnych dla zalogowanych użytkowników konieczne jest
zalogowanie do Systemu c-KOB.
W celu logowania do Systemu c-KOB należy wykonać następujące kroki:
1. Uruchomić Portal Systemu c-KOB i kliknąć przycisk znajdujący się w górnym
rogu portalu Systemu.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
2. W wyświetlonym oknie logowania użytkownik powinien wpisać dane autoryzacyjne w polu
E-mail i Hasło, a następnie kliknąć przycisk Zaloguj.
Logowanie do Systemu c-KOB
Uwaga: Logowanie do Systemu jest możliwe po aktywacji konta przez użytkownika i odblokowaniu konta przez
Administratora c-KOB.
3.3.3 Wylogowanie z Systemu
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
Po zakończeniu pracy w Systemie konieczne jest wylogowanie się z Systemu. Aby to zrobić, należy
kliknąć na pozycję Wyloguj znajdującą się na ostatnim miejscu w Menu Systemu.
Wylogowanie użytkownika z Systemu c-KOB

### Tabela:
| Uwaga: Logowanie do Systemu jest możliwe po aktywacji konta przez użytkownika i odblokowaniu konta przez |
| --- |
| Administratora c-KOB. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.4 Wybór roli
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
Widok Wybór roli umożliwia zmianę (bez konieczności ponownego logowania się do c-KOB) funkcji
(roli) użytkownika Systemu pełnionej w kontekście wszystkich książek obiektów budowlanych, do
których obsługi został on zaproszony.
Domyślnie logowanie użytkownika pozwala na wyświetlenie w Systemie wszystkich danych
powiązanych z użytkownikiem, zależnych od funkcji „Właściciel / Zarządca” pełnionej w ramach
konkretnej książki obiektu budowlanego. Przy użyciu opcji zamieszczonych w sekcji Wybór roli
użytkownik może wskazać określoną rolę na jego liście ról, dzięki czemu rejestr książek obiektów
budowlanych będzie zawierał wyłącznie pozycje odpowiadające wskazanej roli (funkcji) interesariusza.
Uwaga: Widok ten pojawi się również podczas logowania do Systemu c-KOB. Jeśli użytkownik ma przypisaną wyłącznie
jedną rolę w Systemie, widok ten nie pojawi się w aplikacji c-KOB.
Panel Wybór roli w Systemie c-KOB
3.5 Rejestr KOB
3.5.1 Przeglądanie rejestru KOB
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
W celu przeglądania rejestru książek obiektów budowlanych należy w menu kliknąć pozycję Rejestr
KOB. System wyświetli wtedy okno zawierające wykaz książek obiektów budowlanych, do których
dostęp ma zalogowany użytkownik.

### Tabela:
| Uwaga: Widok ten pojawi się również podczas logowania do Systemu c-KOB. Jeśli użytkownik ma przypisaną wyłącznie |
| --- |
| jedną rolę w Systemie, widok ten nie pojawi się w aplikacji c-KOB. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Rejestr KOB
Opcje przeglądania rejestru
• Kliknięcie w nagłówek kolumny powoduje jej sortowanie. Strzałka poniżej nazwy kolumny
wskazuje typ sortowania: sortowanie rosnące, sortowanie malejące.
• Rejestr domyślnie wyświetla 5 rekordów danych, liczbę tą można dostosować do własnych
potrzeb za pomocą panelu Wiersze na stronie znajdującego się na pasku nawigacji w prawym
dolnym rogu rejestru.
Pasek nawigacji po stronach rejestru – parametr liczby wierszy na stronie
• Na pasku nawigacji znajduje się informacja o łącznej liczbie wierszy w tabeli oraz liczbie wierszy
aktualnie wyświetlanych na aktywnej stronie.
Pasek nawigacji po stronach rejestru – informacje o liczbie wierszy w tabeli oraz bieżących wierszach na stronie
• Przycisk służy do przejścia na poprzednią stronę rejestru, a przycisk do wyświetlenia
kolejnej strony.
Dodatkowe opcje dostępne w oknie Rejestr KOB
• Przycisk służy do wyświetlenia podglądu metryki KOB. Temat szerzej opisany został
w osobnym rozdziale.
• Przycisk służy do wyświetlenia opcji obsługi CKOB w postaci menu narzędziowego. Lista
opcji widocznych w menu narzędziowym zależy od uprawnień i roli użytkownika oraz od
aktualnego statusu CKOB i wpisów do niej wprowadzonych.
o Przyjęcie roli – opcja dostępna dla osób zaproszonych do pełnienia danej roli (WZ,
OPK, UPK) w danej CKOB; opcja ta znika z menu po przyjęciu zaproszenia.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
o Odrzucenie roli – opcja dostępna dla osób zaproszonych do pełnienia danej roli (WZ,
OPK, UPK) w danej CKOB; opcja ta znika z menu po odrzuceniu zaproszenia.
o Przekaż dostęp – opcja dostępna wyłącznie dla użytkowników w roli WZ w kontekście
danej CKOB.
o Wpisy – opcja dostępna dla wszystkich użytkowników uprawnionych do przeglądania
wpisów w danej CKOB.
o Interesariusze KOB – opcja dostępna dla wszystkich użytkowników uprawnionych do
przeglądania rejestru interesariuszy danej CKOB.
o Informacje o obiekcie budowlanym – opcja dostępna dla wszystkich użytkowników
uprawnionych do odczytu metryki danej CKOB.
o Dane właściciela/zarządcy obiektu (bądź osoby uprawnionej do reprezentowania
właściciela/zarządcy) – opcja dostępna dla wszystkich użytkowników uprawnionych do
odczytu metryki danej CKOB.
o Zmień status KOB – opcja dostępna dla wszystkich użytkowników uprawnionych do
zamknięcia i ponownego otwarcia CKOB.
o Eksportuj KOB do PDF – opcja dostępna dla wszystkich użytkowników uprawnionych
do eksportu/wydruku danej CKOB do pliku PDF.
o Wyślij protokół z kontroli – opcja dostępna dla użytkownika w roli OPK, jeżeli w danej
CKOB istnieje wpis z kontroli, dla której wymagane jest przesłanie protokołu
pokontrolnego do organu nadzoru budowlanego (opcja jest niewidoczna, jeśli protokół
z kontroli został już wysłany).
o Wyślij zawiadomienie o kontroli – opcja dostępna dla użytkownika w roli OPK, jeżeli
istnieje wpis z kontroli, dla której wymagane jest przesłanie zawiadomienia
o przeprowadzonej kontroli (opcja jest niewidoczna, jeśli zawiadomienie o kontroli
zostało już wysłane).
o Rezygnuj z pełnionej roli – opcja dostępna dla OPK i UPK.
o Weryfikacja sumy kontrolnej – opcja dostępna dla wszystkich użytkowników.
• Przycisk służy do wyświetlenia formularza Załóż nową książkę obiektu
budowlanego. Temat szerzej opisany został w odrębnym rozdziale.
• Przycisk służy do eksportu bieżącej listy książek do pliku PDF, CSV,
XLS. Temat szerzej opisany został w odrębnym rozdziale.
• Panel służy do filtrowania rejestru książek obiektów budowlanych
użytkownika. Temat szerzej opisany został w kolejnym rozdziale.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.5.2 Filtrowanie danych
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
Użytkownik może przeglądać i wyszukiwać CKOB używając narzędzi filtrowania. W celu filtrowania
danych należy kliknąć w tytuł panelu Filtrowanie.
Rozwinięcie/zwinięcie panelu Filtrowanie rejestru
Następnie należy wpisać wyszukiwaną frazę lub zaznaczyć dostępne opcje filtrowania, po czym kliknąć
przycisk .
Kliknięcie ikony kasuje frazę filtrowania wpisaną w danym polu.
Przycisk usuwa wszystkie wpisane frazy i wybrane opcje filtrowania.
Panel Filtrowanie – widok filtrów dla rejestru KOB
W rejestrze zostaną wyświetlone dane spełniające warunki założonych filtrów. Nagłówek panelu
Filtrowanie zmienia kolor na czerwony oraz zostaje oznaczony „*” co informuje użytkownika
o założeniu filtru na danych w rejestrze.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Panel Filtrowanie – oznaczenie aktywnego filtru danych
3.5.3 Podgląd metryki KOB
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
W celu wyświetlenia podglądu metryki książki obiektu budowlanego należy kliknąć ikonę
znajdującą się w kolumnie Metryka KOB rejestru KOB.
Rejestr KOB – wywołanie podglądu metryki KOB
Uwaga: Metryki KOB nie można modyfikować. Dane na metryce są danymi, które są możliwe do edycji z poziomu
formularzy: Informacje o obiekcie budowlanym oraz Dane właściciela/zarządcy bądź osoby uprawnionej do
reprezentowania właściciela/zarządcy obiektu.
Opcje obsługi okna podglądu metryki książki obiektów budowlanych
Powrót do rejestru książek obiektów budowlanych.
Podgląd wersji archiwalnych metryki KOB (powstałych
w wyniku korekty danych dotyczących obiektu budowlanego
oraz danych właściciela/zarządcy lub osoby uprawnionej do
reprezentowania właściciela/zarządcy). Opcja dostępna dla
użytkowników posiadających uprawnienia do odczytu historii
korekt metryki KOB.

### Tabela:
| Uwaga: Metryki KOB nie można modyfikować. Dane na metryce są danymi, które są możliwe do edycji z poziomu |
| --- |
| formularzy: Informacje o obiekcie budowlanym oraz Dane właściciela/zarządcy bądź osoby uprawnionej do |
| reprezentowania właściciela/zarządcy obiektu. |

### Tabela:
|  | Powrót do rejestru książek obiektów budowlanych. |
| --- | --- |
|  | Podgląd wersji archiwalnych metryki KOB (powstałych w wyniku korekty danych dotyczących obiektu budowlanego oraz danych właściciela/zarządcy lub osoby uprawnionej do reprezentowania właściciela/zarządcy). Opcja dostępna dla użytkowników posiadających uprawnienia do odczytu historii korekt metryki KOB. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Rejestr KOB – podgląd metryki KOB cz.1

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Rejestr KOB – podgląd metryki KOB cz.2

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.5.4 Informacje o obiekcie budowlanym
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
W celu wyświetlenia informacji o obiekcie budowlanym należy w menu narzędziowym książki obiektu
budowlanego kliknąć pozycję Informacje o obiekcie budowlanym.
Rejestr KOB – wywołanie okna Informacje o obiekcie budowlanym
Podgląd informacji o obiekcie budowlanym – sekcja Obiekt budowlany

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Podgląd informacji o obiekcie budowlanym – sekcja Wymagane kontrole okresowe
Podgląd informacji o obiekcie budowlanym – sekcja Plan sytuacyjny oraz Załączniki

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Podgląd informacji o obiekcie budowlanym – sekcja lokalizacji obiektu budowlanego (adres, lokalizacja wg EGiB)
Podgląd informacji o obiekcie budowlanym – sekcja Właściwy organ nadzoru budowlanego

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Opcje obsługi okna zawierającego informacje o obiekcie budowlanym.
Powrót do rejestru książek obiektów budowlanych.
Podgląd wersji archiwalnych metryki KOB (powstałych w wyniku korekty
danych dotyczących obiektu budowlanego). Opcja dostępna dla
użytkowników posiadających uprawnienia do odczytu historii korekt metryki
KOB.
Uruchomienie formularza korekty informacji o obiekcie budowlanym. Opcja
wymaga uprawnienia do redakcji formularza Informacji o obiekcie (tablica I).
3.5.5 Dane o właścicielu i zarządcy
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
W celu wyświetlenia informacji o właścicielu/zarządcy lub osoby uprawnionej do reprezentowania
właściciela/zarządcy obiektu należy w menu narzędziowym książki obiektu budowlanego kliknąć
pozycję Dane właściciela/zarządcy obiektu.
Rejestr KOB – wywołanie okna Dane właściciela/zarządcy obiektu budowlanego

### Tabela:
|  | Powrót do rejestru książek obiektów budowlanych. |
| --- | --- |
|  | Podgląd wersji archiwalnych metryki KOB (powstałych w wyniku korekty danych dotyczących obiektu budowlanego). Opcja dostępna dla użytkowników posiadających uprawnienia do odczytu historii korekt metryki KOB. |
|  | Uruchomienie formularza korekty informacji o obiekcie budowlanym. Opcja wymaga uprawnienia do redakcji formularza Informacji o obiekcie (tablica I). |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Dane właściciela/zarządcy obiektu budowlanego
Opcje obsługi okna zawierającego informacje o danych właściciela/zarządcy obiektu budowlanego:
Powrót do rejestru książek obiektów budowlanych.
Podgląd wersji archiwalnych metryki KOB (powstałych w wyniku korekty
danych właściciela/zarządcy bądź osoby uprawnionej do reprezentowania
właściciela/zarządcy). Opcja dostępna dla użytkowników posiadających
uprawnienia do odczytu historii korekt metryki KOB.
Aktywowanie korekty informacji właściciel/zarządca bądź osoba uprawniona
do reprezentowania właściciela/zarządcy obiektu budowlanego. Opcja
wymaga uprawnienia do redakcji formularza Podmiot zakładający KOB
(tablica II).
Usuwanie informacji właściciel/zarządca bądź osoba uprawniona do
reprezentowania właściciela/zarządcy obiektu budowlanego w celu
ponownego uzupełnienia danych. Opcja wymaga uprawnienia do redakcji
formularza Podmiot zakładający KOB (tablica II).

### Tabela:
|  | Powrót do rejestru książek obiektów budowlanych. |
| --- | --- |
|  | Podgląd wersji archiwalnych metryki KOB (powstałych w wyniku korekty danych właściciela/zarządcy bądź osoby uprawnionej do reprezentowania właściciela/zarządcy). Opcja dostępna dla użytkowników posiadających uprawnienia do odczytu historii korekt metryki KOB. |
|  | Aktywowanie korekty informacji właściciel/zarządca bądź osoba uprawniona do reprezentowania właściciela/zarządcy obiektu budowlanego. Opcja wymaga uprawnienia do redakcji formularza Podmiot zakładający KOB (tablica II). |
|  | Usuwanie informacji właściciel/zarządca bądź osoba uprawniona do reprezentowania właściciela/zarządcy obiektu budowlanego w celu ponownego uzupełnienia danych. Opcja wymaga uprawnienia do redakcji formularza Podmiot zakładający KOB (tablica II). |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.5.6 Interesariusze KOB
Funkcjonalność aplikacji w zakresie podglądu rejestru interesariuszy danej CKOB dostępna dla użytkowników w roli:
administrator, lokalny administrator, przedstawiciel nadzoru budowlanego, przedstawiciel organu innego niż NB lub służb
uprawnionych do kontroli przestrzegania przepisów w zakresie utrzymania obiektów budowlanych lub do prowadzenia
działań ratowniczych, osoba przeprowadzająca kontrole.
Funkcjonalność aplikacji w zakresie edycji rejestru interesariuszy danej CKOB dostępna dla użytkowników w roli:
właściciel/zarządca, osoba upoważniona do prowadzenia KOB.
W momencie zakładania książki obiektu budowlanego do grupy interesariuszy zostaje automatycznie
dodany użytkownik tworzący KOB w funkcji właściciel/zarządca bądź osoba uprawniona do
reprezentowania właściciela/zarządcy. Zakładający książkę bezpośrednio po jej utworzeniu musi
wskazać osobę upoważnioną do prowadzania KOB lub samemu przyjąć taką funkcję.
Kolejnych interesariuszy mogą dodawać właściciele i zarządcy (WZ) oraz osoby upoważnione do
prowadzania KOB (UPK).
W celu dodania interesariusza, z menu narzędziowego danej książki obiektu budowlanego, należy
wybrać opcję Interesariusze KOB.
Rejestr KOB – uruchomienie formularza obsługi interesariuszy
W wyświetlonym formularzu Interesariusze książki obiektu budowlanego widoczni są domyślnie
ci interesariusze, których funkcje w ramach danej książki obiektu budowlanego są aktywne (czyli
potwierdzili objęcie funkcji w kontekście przeglądanej CKOB). Widok ten można zmienić klikając na
suwak Pokaż tylko zatwierdzonych. Opcja Pokaż tylko aktualnych pozwala na wyświetlenie widoku
zestawienia interesariuszy, którzy posiadają aktywny dostęp do danej książki obiektu budowlanego.
Kolorem czerwonym oznaczono interesariuszy, którzy dotychczas nie przyjęli funkcji.
Formularz obsługi interesariusza – widok interesariusza, który nie przyjął funkcji

### Tabela:
| Funkcjonalność aplikacji w zakresie podglądu rejestru interesariuszy danej CKOB dostępna dla użytkowników w roli: |
| --- |
| administrator, lokalny administrator, przedstawiciel nadzoru budowlanego, przedstawiciel organu innego niż NB lub służb |
| uprawnionych do kontroli przestrzegania przepisów w zakresie utrzymania obiektów budowlanych lub do prowadzenia |
| działań ratowniczych, osoba przeprowadzająca kontrole. |
| Funkcjonalność aplikacji w zakresie edycji rejestru interesariuszy danej CKOB dostępna dla użytkowników w roli: |
| właściciel/zarządca, osoba upoważniona do prowadzenia KOB. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
W celu dodania nowego interesariusza, należy kliknąć przycisk .
Uwaga: Przycisk ten widoczny jest na formularzu wyłącznie dla użytkowników Systemu c-KOB posiadających odpowiednie
uprawnienie.
Formularz obsługi interesariusza – uruchomienie dodania nowego interesariusza
W wyświetlonym formularzu należy wskazać docelową funkcję interesariusza, podać jego adres e-mail
oraz wskazać datę rozpoczęcia pełnienia wskazanej funkcji w ramach CKOB. Podanie PESEL nie jest na
tym etapie niezbędne, informacja ta może zostać późnej uzupełniona przez samego interesariusza za
pośrednictwem formularza Dane użytkownika.
Formularz dodania interesariusza
Data wygaśnięcia obowiązków jest uzupełniana w sytuacji, kiedy interesariusz otrzymuje czasowy
dostęp do książki obiektu budowlanego. Taki dostęp można określić w dolnym momencie,
wykorzystując opcję Ustaw dostęp czasowy, możliwą do wywołania z poziomu menu narzędziowego
danego interesariusza. Opis tej funkcjonalności znajduje się w dalszej części instrukcji.
Ostatnim krokiem jest potwierdzenie dodania interesariusza przez kliknięcie przycisku
, po którym System wyświetli informację o dodaniu nowego interesariusza do KOB.
W przypadku, gdy wskazana osoba nie posiada konta użytkownika w Systemie c-KOB, System
wyświetla komunikat z prośbą o potwierdzenie chęci dodania interesariusza.

### Tabela:
| Uwaga: Przycisk ten widoczny jest na formularzu wyłącznie dla użytkowników Systemu c-KOB posiadających odpowiednie |
| --- |
| uprawnienie. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Potwierdzenie dodania interesariusza
Po kliknięciu przycisku TAK, dane nowego interesariusza zostaną zapisane w Systemie, a na wskazany
adres e-mail wysłana zostanie wiadomość e-mail z zaproszeniem do rejestracji w Systemie c-KOB oraz
linkiem do przyjęcia zaproszenia do pełnienia funkcji w kontekście danej CKOB. Ten krok zostanie
potwierdzony komunikatem o treści jak na poniższym zrzucie ekranowym:
Informacja systemowa po dodaniu interesariusza
W celu weryfikacji poprawności przypisania interesariusza do książki obiektu budowlanego, należy
zmienić konfigurację domyślnych filtrów w tabeli zestawienia interesariuszy, wyłączając opcję Pokaż
tylko zatwierdzonych. Po wyłączeniu tej opcji w tabeli widoczni są również interesariusze, którzy nie
potwierdzili jeszcze objęcia funkcji w danej CKOB. Osoby te są oznaczone kolorem czerwonym oraz nie
mają uzupełnionej daty przyjęcia obowiązków.
Formularz obsługi interesariuszy – widok nowo dodanego interesariusza, który oczekuje na przyjęcie zaproszenia do objęcia funkcji
Dodatkowe opcje obsługi interesariuszy KOB
Podgląd informacji nt. interesariusza można uzyskać po kliknięciu ikony .
Powrót do rejestru interesariuszy KOB.
Zestaw narzędzi do obsługi interesariuszy KOB znajduje się w menu podręcznym.

### Tabela:
|  | Powrót do rejestru interesariuszy KOB. |
| --- | --- |
|  | Zestaw narzędzi do obsługi interesariuszy KOB znajduje się w menu podręcznym. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Formularz obsługi interesariusza – wyświetlenie informacji o interesariuszu
Formularz obsługi interesariusza – podgląd informacji o interesariuszu
Narzędzia obsługi interesariusza
Usuń przypisanego interesariusza - umożliwia pozbawienie dostępu do książki obiektu
budowlanego danego interesariusza. Usunięcie dostępu do książki wymaga potwierdzania - kliknięcie
w oknie zapytania. Data końca dostępu do książki obiektu budowlanego zostanie zapisana
i wyświetlona w rejestrze interesariuszy KOB w kolumnie Data wygaśnięcia obowiązków.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Potwierdzenie usunięcia dostępu do książki obiektu budowlanego
Ustaw dostęp czasowy - funkcjonalność ta umożliwia zdefiniowanie daty końca dostępu danego
użytkownika do książki obiektu budowlanego.
Formularz konfiguracji dostępu czasowego do książki obiektu budowlanego
Po zatwierdzeniu wyboru daty oraz kliknięciu przycisku Zapisz, data końca dostępu do książki obiektu
budowlanego zostanie zapisana i wyświetlona w rejestrze interesariuszy KOB w kolumnie Data
wygaśnięcia roli.
Rejestr interesariuszy po ustawieniu dostępu czasowego do książki

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Opcja Ustaw dostęp czasowy umożliwia również przywrócenie bezterminowego dostępu do książki
obiektu budowlanego. Aby to zrobić, należy kliknąć ikonę znajdującą się po prawej stronie daty
wygaśnięcia obowiązków.
Formularz ustawienia czasowego dostępu do książki obiektu budowlanego – ustawienie bezterminowego dostępu
Edytuj dodatkowe informacje - umożliwia dodanie dodatkowych informacji o interesariuszu KOB
nieprzewidzianych w formularzach systemowych.
Formularz edycji opisu dodatkowego interesariusza
3.5.6.1 Interesariusz nieposiadający konta w Systemie c-KOB
Funkcjonalność aplikacji dostępna dla użytkownika w roli: interesariusz KOB.
W przypadku dodawania do książki obiektu budowlanego interesariusza, który nie posiada konta
użytkownika w Systemie c-KOB, System po kliknięciu przycisku Zapisz wskaże, iż wymagane jest
uzupełnienie dodatkowych informacji o użytkowniku, umożliwiających jego identyfikację
i potwierdzenie tożsamości. Zapraszana do roli interesariusza osoba otrzyma wiadomość e-mail
z instrukcją dalszego postępowania.
Zatwierdzenie udziału w procesie obsługi CKOB będzie wymagało wcześniejszej rejestracji konta
użytkownika, a następnie potwierdzenia przyjęcia funkcji.
Rejestrację konta można przeprowadzić klikając w otrzymanej wiadomości przycisk Zaloguj się
Węzłem Krajowym.
Po rejestracji konta możliwe jest przystąpienie do zatwierdzenia funkcji interesariusza w ramach danej
CKOB, klikając przycisk Zatwierdź w wiadomości mailowej.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Wiadomość e-mail do użytkownika nieposiadającego konta w Systemie c-KOB z informacją
o procedurze rejestracji konta użytkownika i przyjęcia funkcji
3.5.6.2 Przyjęcie roli interesariusza
Funkcjonalność aplikacji dostępna dla użytkownika w roli: interesariusz KOB.
Objęcie roli przez interesariuszy zaproszonych do obsługi CKOB i formalne potwierdzenie przyjęcia
obowiązków do nich należących jest możliwe w Systemie na 3 sposoby:
1. Poprzez kliknięcie przycisku Zatwierdź w wiadomości e-mail;
2. Poprzez kliknięcie linku w powiadomieniu systemowym;
3. Poprzez wybranie opcji Przyjęcie roli w menu narzędziowym w Rejestrze KOB.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Ad. 1. Poniżej zamieszczony został przykład treści wiadomości e-mail z informacją o zaproszeniu do
grona interesariuszy w określonej roli w kontekście konkretnej CKOB.
Treść wiadomości e-mail z zaproszeniem do objęcia roli
W celu podjęcia się pełnienia danej roli w kontekście wskazanej CKOB, należy kliknąć przycisk
w przesłanej wiadomości e-mail.
Użytkownik zostanie przekierowany do Systemu c-KOB (jeśli nie jest on zalogowany wywołany zostanie
formularz logowania), w którym wyświetlone zostanie okno potwierdzenia objęcia przez interesariusza
wskazanej roli w danej CKOB.
Potwierdzenie przyjęcia roli
Ad. 2. Inną ścieżką do potwierdzenia przyjęcia obowiązków jest kliknięcie w link służący do przyjęcia
roli interesariusza w danej CKOB, który przesłany zostanie do użytkownika w powiadomieniu
systemowym.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Treść powiadomienia systemowego z informacją o zaproszeniu do objęcia roli
Ad. 3. Ostatnią możliwością przyjęcia roli interesariusza w danej CKOB jest wybór opcji Przyjęcie roli,
która jest dostępna w menu narzędziowym danej książki obiektu budowlanego.
Rejestr KOB – opcja przyjęcia roli
Po wybraniu tej opcji System wyświetli okno Przyjęcia roli interesariusza z informacją o numerze
książki obiektu budowlanego, nazwą obiektu budowlanego oraz rolą jaką obejmuje użytkownik w danej
CKOB. Użytkownik potwierdza objęcie roli klikając przycisk .
Rejestr KOB – potwierdzenie przyjęcia roli
Potwierdzenie zapisywane jest w bazie danych Systemu. Od tego momentu interesariusz otrzymuje
kolejne uprawnienia do obsługi książki obiektu budowlanego np.: możliwość dokonywania wpisów
w książce.
Właściciel/zarządca oraz osoba upoważniona do prowadzania danej CKOB są każdorazowo
informowani drogą mailową oraz poprzez powiadomienie systemowe o przyjęciu roli przez
interesariusza w ramach danej CKOB.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Powiadomienie systemowe – potwierdzenie przyjęcia roli
3.5.6.3 Odrzucenie roli interesariusza
Funkcjonalność aplikacji dostępna dla użytkownika w roli: interesariusz KOB.
Odrzucenie roli, podobnie jak jej przyjęcie, jest możliwe w Systemie na 3 sposoby:
1. Poprzez kliknięcie przycisku Odrzuć w wiadomości e-mail;
2. Poprzez kliknięcie linku w powiadomieniu systemowym;
3. Poprzez wybranie opcji Odrzucenie roli w menu narzędziowym w Rejestrze KOB.
Ad. 1. Poniżej zamieszczony został przykład treści wiadomości e-mail z informacją o zaproszeniu do
grona interesariuszy w określonej funkcji w kontekście konkretnej CKOB z możliwością przyjęcia
i odrzucenia roli.
Treść wiadomości e-mail z zaproszeniem do objęcia roli

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
W celu odrzucenia danej roli w kontekście wskazanej CKOB, należy kliknąć przycisk
w przesłanej wiadomości e-mail.
Użytkownik zostanie przekierowany do Systemu c-KOB (jeśli nie jest on zalogowany, wywołany
zostanie formularz logowania), w którym wyświetlone zostanie okno odrzucenia objęcia przez
interesariusza wskazanej funkcji w danej CKOB.
Ad. 2. Inną ścieżką do odrzucenia obowiązków jest kliknięcie w link służący do odrzucenia roli
interesariusza w danej CKOB, który przesłany zostanie do użytkownika w powiadomieniu systemowym.
Treść powiadomienia systemowego z informacją o zaproszeniu do objęcia roli
Ad. 3. Ostatnią możliwością odrzucenia roli interesariusza w danej CKOB jest wybór opcji Odrzucenie
roli, która jest dostępna w menu narzędziowym danej książki obiektu budowlanego.
Rejestr KOB – opcja odrzucenia roli
Po wybraniu tej opcji System wyświetli okno Odrzucenie przyjęcia roli interesariusza z informacją
o numerze książki obiektu budowlanego, nazwą obiektu budowlanego oraz rolą użytkownika w danej
CKOB. Użytkownik odrzuca objęcie roli klikając przycisk .
Rejestr KOB – odrzucenie przyjęcia roli
Odrzucenie zapisywane jest w bazie danych Systemu.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Właściciel/zarządca oraz osoba upoważniona do prowadzania danej CKOB są każdorazowo
informowani drogą mailową oraz poprzez powiadomienie systemowe o odrzuceniu roli przez
interesariusza w ramach danej CKOB.
Powiadomienie systemowe – odrzucenie roli
3.5.6.4 Rezygnuj z pełnionej roli
Funkcjonalność aplikacji dostępna dla użytkownika w roli: właściciel/zarządca*, osoba upoważniona do prowadzenia KOB,
osoba przeprowadzająca kontrole (* jeśli w książce istnieje inny interesariusz w roli właściciel/zarządca).
Opcja ta znajduje się w menu narzędziowym danej CKOB.
Rejestr KOB – opcja rezygnacji z pełnionej roli
Po wyborze pozycji Rezygnuj z pełnionej roli, System wyświetli użytkownikowi komunikat z pytaniem,
czy na pewno chce zrezygnować z pełnionej roli – aby potwierdzić decyzję należy kliknąć przycisk TAK.
Potwierdzenie rezygnacji z pełnionej roli
Po kliknięciu System automatycznie ustawia datę wygaśnięcia obowiązków użytkownika w kontekście
danej CKOB i tym samym blokuje dostęp do CKOB osobie, która rezygnuje z pełnionej roli. Wysyłane
jest również powiadomienie systemowe do WZ informujące o tym fakcie.

### Tabela:
| Funkcjonalność aplikacji dostępna dla użytkownika w roli: właściciel/zarządca*, osoba upoważniona do prowadzenia KOB, |
| --- |
| osoba przeprowadzająca kontrole (* jeśli w książce istnieje inny interesariusz w roli właściciel/zarządca). |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.5.7 Wpisy do Książki obiektu budowlanego
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
W celu wyświetlenia wpisów do książki obiektu budowlanego należy w menu narzędziowym książki
obiektu budowlanego kliknąć pozycję Wpisy.
Uwaga: Widoczność tej opcji w menu zależy od uprawnień użytkownika oraz od wykonania etapów poprzedzających
możliwość dodawania i przeglądania wpisów oraz przyjęcie obowiązków interesariusza.
Rejestr KOB – wyświetlenie rejestru wpisów
W oknie Wpisy książki obiektu budowlanego należy wybrać tablicę, w której chcemy przeglądać,
dodawać lub modyfikować wpisy. Lista tablic jest tożsama dla wszystkich interesariuszy danej CKOB,
ale narzędzia obsługi poszczególnych tablic zależą od roli (funkcji) jaką interesariusz pełni w danej
CKOB. Edycję wpisów w Tablicy III może wykonać wyłącznie osoba przeprowadzająca kontrolę.
Pozostałe Tablice mogą być w pełni obsługiwane przez właściciela/zarządcę oraz osobę upoważnioną
do prowadzania CKOB.
Wpisy książki obiektu budowlanego – lista tablic

### Tabela:
| Uwaga: Widoczność tej opcji w menu zależy od uprawnień użytkownika oraz od wykonania etapów poprzedzających |
| --- |
| możliwość dodawania i przeglądania wpisów oraz przyjęcie obowiązków interesariusza. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.5.7.1 Dodanie wpisu
Funkcjonalność aplikacji dostępna dla użytkownika w roli: właściciel/zarządca, osoba uprawniona do prowadzenia KOB*,
osoba przeprowadzająca kontrole* (*jeżeli została dodana do rejestru interesariuszy danej CKOB).
Dodanie wpisu wymaga kliknięcia przycisku , po czym wyświetlony zostanie panel
treści nowego wpisu.
Dodanie wpisu do książki obiektu budowlanego
Każda z tablic ma indywidualny formularz obsługi wpisu. Po uzupełnieniu treści wpisu minimalnie
w zakresie wymaganym, należy go zapisać poprzez kliknięcie przycisku .
Dodatkowo do wpisu mogą zostać dołączone załączniki plikowe.
Dodanie wpisu do Tablicy VI

### Tabela:
| Funkcjonalność aplikacji dostępna dla użytkownika w roli: właściciel/zarządca, osoba uprawniona do prowadzenia KOB*, |
| --- |
| osoba przeprowadzająca kontrole* (*jeżeli została dodana do rejestru interesariuszy danej CKOB). |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Każdy nowy wpis otrzymuje status aktualny. Użytkownik posiadający odpowiednie uprawnienia ma do
dyspozycji następujące narzędzia do obsługi wpisu:
• Podgląd wpisu;
• Korekta wpisu;
• Anulowanie wpisu.
Rejestr wpisów w Tablicy VI – widok dodanego wpisu
UWAGA! Wpisy w Tablicy III dodane 7 dni po zakończeniu kontroli mają datę wpisu oznaczoną na czerwono
Rejestr wpisów w Tablicy III – oznaczenie wpisu z kontroli wprowadzonego 7 dni po zakończeniu kontroli
3.5.7.2 Podgląd wpisu
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
Podgląd wpisu i jego załączników możliwy jest po wyborze z poziomu menu narzędziowego wpisu opcji
Pokaż wpis.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Rejestr wpisów w Tablicy VI – menu narzędziowe, opcja Pokaż wpis
Podgląd wpisu
3.5.7.3 Korekta wpisu
Funkcjonalność aplikacji dostępna dla użytkownika w roli: właściciel/zarządca, osoba uprawniona do prowadzenia KOB*,
osoba przeprowadzająca kontrole* (*jeżeli została dodana do rejestru interesariuszy danej CKOB).
Interesariusz może korygować wyłącznie własne wpisy w statusie aktualny.
W tym celu w menu narzędziowym wpisu należy wybrać opcję Skoryguj wpis. W oknie Koryguj wpis
należy wprowadzić skorygowaną treść wpisu oraz fakultatywnie dołączyć załączniki.
UWAGA! Poprzednio dodane do wpisu załączniki nie są wiązane z nową treścią wpisu, dlatego też należy je ponownie
załączyć do korygowanego wpisu.
UWAGA! Korygować wpis można w okresie 30 dni od momentu dodania danego wpisu!

### Tabela:
| Funkcjonalność aplikacji dostępna dla użytkownika w roli: właściciel/zarządca, osoba uprawniona do prowadzenia KOB*, |
| --- |
| osoba przeprowadzająca kontrole* (*jeżeli została dodana do rejestru interesariuszy danej CKOB). |

### Tabela:
| UWAGA! Poprzednio dodane do wpisu załączniki nie są wiązane z nową treścią wpisu, dlatego też należy je ponownie |
| --- |
| załączyć do korygowanego wpisu. |
| UWAGA! Korygować wpis można w okresie 30 dni od momentu dodania danego wpisu! |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Uruchomienie korekty wpisu
Korekta wpisu
Po dokonaniu zapisu, status korygowanego wpisu zostaje zmieniony na anulowany i wpis jest
ukrywany w tabeli wpisów (domyślnie widoczne są wyłącznie aktualne wpisy). Aby wyświetlić
anulowane wpisy należy zmienić opcje filtrowania danych. Wpisy skorygowane są oznaczane w tabeli
wpisów kolorem czerwonym.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Rejestr wpisów z widocznymi wszystkimi wpisami
Skorygowaną treść wpisu można podglądnąć klikając opcję Pokaż wpis korygujący w menu
narzędziowym wpisu o statusie anulowany.
Wywołanie podglądu wpisu korygującego
Podgląd wpisu korygującego
W podglądzie wpisu anulowanego kolorem pomarańczowym oznaczone zostały zmiany treści wpisu
oraz znajduje się odnośnik do wpisu korygującego.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Podgląd wpisu anulowanego
3.5.7.4 Anulowanie wpisu
Funkcjonalność aplikacji dostępna dla użytkownika w roli: właściciel/zarządca, osoba uprawniona do prowadzenia KOB*,
osoba przeprowadzająca kontrole* (*jeżeli została dodana do rejestru interesariuszy danej CKOB).
Interesariusz może anulować wpis, ale wyłącznie w zakresie własnych, aktualnych wpisów. W tym celu
w menu narzędziowym wpisu należy wybrać opcję Oznacz wpis jako anulowany.
UWAGA! Anulować wpis można w okresie 30 dni od momentu dodania danego wpisu!
Menu narzędziowe wpisu – opcja anulowania wpisu

### Tabela:
| Funkcjonalność aplikacji dostępna dla użytkownika w roli: właściciel/zarządca, osoba uprawniona do prowadzenia KOB*, |
| --- |
| osoba przeprowadzająca kontrole* (*jeżeli została dodana do rejestru interesariuszy danej CKOB). |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
W oknie Anuluj wpis należy podać uzasadnienie anulowania wpisu:
Formularz anulowania wpisu
Po zapisie, status anulowanego wpisu zostaje zmieniony na anulowany oraz blokowany jest on do
modyfikacji. W podglądzie anulowanego wpisu znajduje się uzasadnienie jego anulowania.
Rejestr wpisów z widocznymi wpisami anulowanymi
Podgląd anulowanego wpisu z uzasadnieniem anulowania wpisu
3.5.8 Wyślij zawiadomienie o przeprowadzonej kontroli
Funkcjonalność aplikacji dostępna dla użytkowników w roli: osoba przeprowadzająca kontrole.
W celu wysłania zawiadomienia o przeprowadzonej kontroli budynku o powierzchni zabudowy
przekraczającej 2000 m2, bądź innym obiekcie budowlanym o powierzchni dachu przekraczającej 1000
m2, należy w menu narzędziowym książki obiektu budowlanego kliknąć pozycję Wyślij zawiadomienie
o kontroli.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Rejestr KOB – wywołanie opcji wysłania zawiadomienia o kontroli
W przypadku kiedy w danej CKOB istnieje tylko jedna kontrola, dla której wymagane jest przesłanie
zawiadomienia, System wyświetli formularz wyboru kontroli, z możliwością zmiany organu nadzoru
budowlanego, do którego zawiadomienie powinno zostać przesłane.
Formularz wyboru kontroli, dla której przesłane ma zostać zawiadomienie – zmiana organu NB
Po odpowiednim wskazaniu organu, należy kliknąć przycisk Wyślij. Pojawi się komunikat z prośbą
o potwierdzenie wysłania zawiadomienia.
Potwierdzenie wysłania zawiadomienia o kontroli

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
W przypadku występowania wpisów dotyczących więcej niż jednej kontroli wymagającej wysłania
zawiadomienia, użytkownik zostanie poproszony przez System o wskazanie kontroli, o której chce
zawiadomić organy nadzoru budowlanego.
Wybór kontroli, dla której wysłane ma być zawiadomienie
Przed wysłaniem zawiadomienia o kontroli użytkownik ma możliwość zmiany organu nadzoru
budowlanego. Zawiadomienie wysyłane jest na kontaktowy adres e-mail wybranego organu NB,
konfigurowany w module Administratora za pomocą formularza Zarządzanie e-mail organu NB.
W przypadku braku przypisania adresu e-mail do właściwego organu NB, zawiadamiający zostanie
poinformowany o tym komunikatem, a do użytkowników Systemu będących przedstawicielami
wskazanego organu nadzoru budowlanego zostanie wysłana wiadomość e-mail z prośbą
o uzupełnienie tego adresu w Systemie c-KOB.
Komunikat informujący o braku możliwości wysłania zawiadomienia ze względu na brak adresu e-mail do kontaktu
z właściwym organem nadzoru budowlanego
Powiadomienie systemowe informujące administratora c-KOB właściwego organu NB o konieczności uzupełnienia adresu e-mail
na potrzeby obsługi zawiadomień i protokołów z kontroli

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.5.9 Wyślij protokół z kontroli
Funkcjonalność aplikacji dostępna dla użytkowników w roli: osoba przeprowadzająca kontrole.
W celu wysłania protokołu z kontroli okresowej, podczas której wystąpiły okoliczności, o których mowa
w art. 70 u.p.b. należy w menu narzędziowym książki obiektu budowlanego kliknąć pozycję Wyślij
protokół z kontroli.
Rejestr KOB – wywołanie opcji wysłania protokołu z kontroli
W przypadku, gdy w danej CKOB istnieje tylko jeden wpis dotyczący kontroli, dla której wymagane jest
wysłanie protokołu pokontrolnego, System wyświetli formularz wyboru kontroli, z możliwością zmiany
organu nadzoru budowlanego, do którego protokół powinien zostać przesłany.
Formularz wyboru kontroli, dla której przesłany ma zostać protokół – zmiana organu NB
Po odpowiednim wskazaniu organu, należy kliknąć przycisk Wyślij. Pojawi się komunikat z prośbą
o potwierdzenie wysłania protokołu.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Potwierdzenie wysłania protokołu z kontroli
Natomiast w przypadku kiedy istnieje więcej niż jedna kontrola wymagająca wysłania protokołu,
użytkownik zostanie poproszony o wskazanie wpisu z kontroli, dla której chce wysłać protokół.
Wybór kontroli, dla której wysłany ma być protokół
Przed wysłaniem protokołu z kontroli użytkownik ma możliwość zmiany organu nadzoru budowlanego.
W przypadku budowli będących obiektami liniowymi, oprócz zmiany organu NB, jest także możliwość
dodania innego organu. W tym celu, na wyświetlonym formularzu, należy kliknąć przycisk ,
a następnie wybrać z listy odpowiedni organ.
Formularz wyboru kontroli, dla której przesłany ma zostać protokół – dodanie organu NB

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Formularz wyboru kontroli, dla której przesłany ma zostać protokół – widok dodanego organu NB
Aby usunąć organ NB należy kliknąć .
Uwaga: Jeśli w trakcie zakładania CKOB dla obiektu liniowego użytkownik wskazał więcej niż jeden organ nadzoru
budowlanego, to w formularzu wyboru kontroli, dla której przesłany ma zostać protokół będą automatycznie wyświetlały
się wszystkie wykazane w książce organy.
Protokół wysyłany jest na kontaktowy adres e-mail organu NB, konfigurowany w module
Administratora za pomocą formularza Zarządzanie e-mail organu NB. W przypadku braku przypisania
adresu e-mail do właściwego organu NB, użytkownik wysyłający protokół zostanie o tym
poinformowany komunikatem, a do użytkowników Systemu będących przedstawicielami wskazanego
organu nadzoru budowlanego zostanie wysłana wiadomość e-mail z prośba o uzupełnienie tego adresu
w Systemie c-KOB.
Komunikat informujący o braku możliwość wysłania protokołu ze względu na brak adresu e-mail do kontaktu
z właściwym organem nadzoru budowlanego

### Tabela:
| Uwaga: Jeśli w trakcie zakładania CKOB dla obiektu liniowego użytkownik wskazał więcej niż jeden organ nadzoru |
| --- |
| budowlanego, to w formularzu wyboru kontroli, dla której przesłany ma zostać protokół będą automatycznie wyświetlały |
| się wszystkie wykazane w książce organy. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Powiadomienie systemowe informujące administratora c-KOB właściwego organu NB o konieczności uzupełnienia adresu e-mail
na potrzeby obsługi zawiadomień i protokołów z kontroli
3.5.9.1 Własny protokół z kontroli
Funkcjonalność aplikacji dostępna dla użytkowników w roli: osoba przeprowadzająca kontrole.
System c-KOB umożliwia przesłanie protokołu z kontroli generowanego automatycznie na podstawie
danych zawartych we wpisie dotyczącym danej kontroli. Dodatkowo istnieje możliwość wysłania
własnego protokołu przygotowanego poza Systemem c-KOB – opcja Dodaj własny protokół jest
dostępna z poziomu okna wysłania protokołu. Dopuszczalne formaty plików to formaty graficzne (png,
jpg, tif), dokumenty (doc i pdf) oraz archiwum (zip) .
Opcja umożliwiająca wysłanie własnego protokołu z kontroli okresowej obiektu
Własny protokół zapisywany jest jako załącznik do wpisu dotyczącego danej kontroli.
3.5.10 Eksport zestawień do pliku
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
Rejestr KOB można zapisać do pliku w kilku formatach. Narzędzie do eksportu danych dostępne jest
pod przyciskiem . Po jego kliknięciu należy wskazać format pliku, w jakim chcemy
zapisać zestawienie książek. Do wyboru dostępne są następujące formaty: pdf, csv, xls.
Uwaga: Do pliku zapisywane są wyłącznie aktualnie widoczne w rejestrze książki obiektu budowlanego. Jeśli Rejestr KOB
ma aktywny filtr danych to w celu wygenerowania pełnego rejestru KOB należy ten filtr wyczyścić.

### Tabela:
| Uwaga: Do pliku zapisywane są wyłącznie aktualnie widoczne w rejestrze książki obiektu budowlanego. Jeśli Rejestr KOB |
| --- |
| ma aktywny filtr danych to w celu wygenerowania pełnego rejestru KOB należy ten filtr wyczyścić. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Eksport rejestru KOB
Wyeksportowany rejestr książek obiektów budowlanych zgodny z ustawionym filtrowaniem danych
3.5.11 Eksport KOB do pliku PDF
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
Eksport książki obiektu budowlanego do pliku PDF jest możliwy z poziomu menu narzędziowego książki
w rejestrze KOB.
Uruchomienie eksportu CKOB do pliku PDF

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Książka obiektu budowlanego domyślnie eksportowana jest w wersji pełnej, czyli zawiera aktualne
wpisy ze wszystkich tablic.
Okno eksportu KOB do pliku PDF – domyślne parametry eksportu
Zawartość eksportowanego pliku można określić zmieniając parametry eksportu. Generowanie pliku
rozpoczyna się po kliknięciu przycisku Zapisz.
Okno eksportu KOB do pliku PDF – konfiguracja parametrów eksportu

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
KOB w formacie PDF – widok strony tytułowej
Uwaga: Eksport KOB do pliku PDF w obu wersjach jest domyślnie dostępny dla interesariuszy oraz przedstawicieli organów
administracji i innych służb.
3.5.12 Weryfikacja sumy kontrolnej
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
W celu sprawdzenia czy dokument PDF z KOB został wygenerowany przez System c-KOB i jego treść
nie podlegała modyfikacji, należy wykonać weryfikację sumy kontrolnej dokumentu. Służy do tego
narzędzie Weryfikacja sumy kontrolnej znajdujące się w menu narzędziowym CKOB.

### Tabela:
| Uwaga: Eksport KOB do pliku PDF w obu wersjach jest domyślnie dostępny dla interesariuszy oraz przedstawicieli organów |
| --- |
| administracji i innych służb. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Uruchomienie narzędzia Weryfikacja sumy kontrolnej
W oknie weryfikacji sumy kontrolnej należy w polu Nazwa pliku wskazać plik PDF z KOB, która ma
zostać walidowana, a następie kliknąć przycisk .
Okno Weryfikacja sumy kontrolnej
System dokona weryfikacji sumy kontrolnej wskazanego danego dokumentu z sumą zapisaną w bazie
c-KOB. Po zakończeniu weryfikacji jej wynik wyświetlany zostanie w oknie informacyjnym.
Okno z pozytywnym wynikiem weryfikacji sumy kontrolnej

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Okno z negatywnym wynikiem weryfikacji sumy kontrolnej
3.6 Raporty
Funkcjonalność aplikacji dostępna dla użytkowników w roli: administrator, lokalny administrator, przedstawiciel nadzoru
budowlanego.
System c-KOB umożliwia generowanie predefiniowanych raportów, które są dostępne dla
użytkowników z odpowiednimi uprawnieniami. Pliki raportów zapisywane są formacie PDF.
Lista raportów predefiniowanych:
• Liczba zarejestrowanych w danej jednostce czasu (wybór zakresu dat z kalendarza) książek
obiektów budowlanych dla całego kraju lub z podziałem na województwa i powiaty,
z rozdzieleniem na budynki (w tym z wyodrębnionymi budynkami o powierzchni zabudowy
>2000 m2) i budowle (w tym z wyodrębnionymi budowlami o powierzchni dachu >1000 m2).
• Zestawienie tabelaryczne zarejestrowanych w danej jednostce czasu (wybór zakresu dat
z kalendarza) książek obiektów budowlanych dla całego kraju lub z podziałem na
województwa, z rozdzieleniem na budynki (w tym z wyodrębnionymi budynkami
o powierzchni zabudowy >2000 m2) i budowle (w tym z wyodrębnionymi budowlami
o powierzchni dachu >1000 m2).
• Liczba otwartych KOB dla całego kraju lub z podziałem na województwa i powiaty oraz rodzaje
obiektów, z rozdzieleniem na budynki (w tym z wyodrębnionymi budynkami o powierzchni
zabudowy >2000 m2) i budowle (w tym z wyodrębnionymi budowlami o powierzchni dachu
>1000 m2).
• Zestawienie tabelaryczne otwartych KOB dla całego kraju lub z podziałem na województwa
i powiaty oraz rodzaje obiektów, z rozdzieleniem na budynki (w tym z wyodrębnionymi
budynkami o powierzchni zabudowy >2000 m2) i budowle (w tym z wyodrębnionymi
budowlami o powierzchni dachu >1000 m2).
• Liczba KOB dla całego kraju lub z danego powiatu/województwa, dla których w zadanym roku
nie dokonano wpisu o przeprowadzeniu kontroli danego rodzaju – czyli tych, dla których
w danym roku wygenerowane zostały powiadomienia o braku kontroli – zawierający dane
o łącznej liczbie otwartych książek, oraz o liczbie książek w których nie dokonano wpisu
o kontroli danego rodzaju (rodzaje obiektów w wierszach – sumaryczna liczba KOB i liczba KOB
z brakującymi wpisami dotyczącymi poszczególnych kontroli w kolumnach).
• Wykaz i liczba KOB dla całego kraju lub z danego powiatu/województwa, dla których
w zadanym roku, nie dokonano wpisu o przeprowadzeniu kontroli danego rodzaju – czyli tych,
dla których w danym roku wygenerowane zostały powiadomienia o braku kontroli –

### Tabela:
| Funkcjonalność aplikacji dostępna dla użytkowników w roli: administrator, lokalny administrator, przedstawiciel nadzoru |
| --- |
| budowlanego. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
zawierający dane o łącznej liczbie otwartych książek, oraz o liczbie książek w których nie
dokonano wpisu o kontroli danego rodzaju (rodzaje obiektów w wierszach – sumaryczna liczba
KOB i liczby KOB z brakującymi wpisami dotyczącymi poszczególnych kontroli w kolumnach).
• Wykaz liczbowy KOB dla całego kraju lub z danego powiatu/województwa, dla których
w zadanym roku dokonano wpisu o przeprowadzeniu kontroli danego rodzaju – z podziałem
na rodzaje obiektów, zawierający dane o łącznej liczbie otwartych książek, liczbie książek
w których dokonano wpisu o kontroli danego rodzaju oraz o liczbie wpisów o kontrolach,
w ramach których stwierdzone zostały nieprawidłowości (rodzaje obiektów w wierszach –
sumaryczna liczba KOB i liczby KOB z wpisami dotyczącymi poszczególnych kontroli
w kolumnach).
• Wykaz liczbowy KOB, dla których w zadanym roku dokonano wpisu o kontroli, w ramach której
stwierdzono zagrożenie bezpieczeństwa (z art. 70 u.p.b.). Lista wszystkich książek, w których
w danej jednostce czasu dokonano wpisu o kontroli, w ramach której stwierdzono zagrożenie
bezpieczeństwa z podziałem na województwa i powiaty oraz z podziałem na właściwe organy.
Lista powinna zawierać co najmniej dane takie jak: numer książki, rodzaj obiektu, rodzaj
budynku albo budowli, lokalizacja obiektu budowlanego, czy jest to obiekt
wielkopowierzchniowy oraz data wpisu o kontroli, w ramach której stwierdzone zostały wyżej
wymienione nieprawidłowości.
• Wykaz KOB w kraju lub wybranym województwie/powiecie, dotyczących obiektów
budowlanych wyposażonych w wybrane instalacje/urządzenia, zawierający: numer KOB,
rodzaj obiektu, adres.
• Przeprowadzone kontrole obiektu - raport w obrębie tablicy III danej KOB – generujący dane
o przeprowadzonych kontrolach w porządku chronologicznym, zawierający informacje
o datach rozpoczęcia i zakończenia kontroli, rodzaju kontroli, stwierdzonych
nieprawidłowościach i skierowanych zaleceniach.
• Historia obiektu - raport w obrębie tablic III-VIII danej KOB – generujący dane o kontrolach
obiektu, sporządzonych opracowaniach i innych dokumentach dotyczących obiektu
w porządku chronologicznym, zawierający informacje o dacie zdarzenia/czynności, rodzaju
zdarzenia/czynności.
• Przeprowadzone kontrole – raport dla OPK.
• Zawiadomienia o przeprowadzonych kontrolach obiektów wielkopowierzchniowych - raport
dla organów nb – generujący dane o otrzymanych w danej jednostce czasu (wybór zakresu dat
z kalendarza) zawiadomieniach, w tym: numer KOB, data zakończenia kontroli, data
przekazania zawiadomienia, rodzaj obiektu, lokalizacja obiektu, rodzaju kontroli, czy
stwierdzono nieprawidłowości.
• Przekazane protokoły z kontroli okresowych, w ramach których stwierdzone zostały
nieprawidłowości, o których mowa w art. 70 Pb - raport dla organów nb – generujący dane
o otrzymanych w danej jednostce czasu (wybór zakresu dat z kalendarza) protokołach, w tym:
numer KOB, data zakończenia kontroli, data przekazania protokołu, rodzaj obiektu, lokalizacja
obiektu, stwierdzone nieprawidłowości, sformułowane zalecenia.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
• Wykaz KOB, w całym kraju lub wybranym województwie/powiecie, które w danej jednostce
czasu (wybór zakresu dat z kalendarza) zostały zamknięte, zawierający: numer KOB, rodzaj
obiektu, adres, data zamknięcia KOB.
W celu wygenerowania raportu należy wykonać następujące kroki:
1. Kliknąć pozycję w menu Raporty.
2. W wyświetlonym oknie z listy raportów wybrać jeden z raportów.
3. Jeśli raport posiada parametry konfiguracyjne, należy je ustawić według własnych potrzeb
i następnie kliknąć .
Generowanie raportów predefiniowanych
Raport zostanie zapisany na dysku komputera, na którym pracuje użytkownik.
Podgląd raportu - Liczba książek zarejestrowanych w danym okresie, w podziale na województwa
i powiaty (dane z całego kraju)
3.7 Profil użytkownika
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
W menu Profil użytkownika znajdują się informacje dotyczące aktualnie zalogowanego do Systemu
użytkownika zapisane w ramach jego profilu w Systemie c-KOB.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.7.1 Powiadomienia
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
W module Powiadomienia zgromadzone są wiadomości z Systemu c-KOB informujące użytkownika
o istotnych etapach obsługi książki obiektu budowlanego oraz powiadomienia techniczne (dotyczące
np. aktualizacji Systemu lub przerw technicznych).
Okno powiadomień systemowych
Nowe powiadomienia oraz te dotychczas nieprzeczytane przez użytkownika, oznaczone są
pogrubieniem czcionki. Aby je wyświetlić należy kliknąć ikonę . Po przeczytaniu wiadomości jest ona
oznaczana jako przeczytana, a w Systemie zapisywana jest data jej odebrania.
Okno podglądu treści powiadomienia

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Nowe wiadomości sygnalizowane są ikoną , obok której wyświetlana jest liczba nowych
powiadomień. Kliknięcie ikony powoduje wyświetlenie okna z rejestrem powiadomień. W rejestrze
domyślnie wyświetlane są wiadomości nieprzeczytane, posortowane malejąco według daty i godziny
przesłania wiadomości.
Sygnalizacja nowych wiadomości oraz przejście do ich podglądu
Powiadomienia można przeglądać i wyszukiwać używając narzędzi filtrowania. W celu filtrowania
danych należy kliknąć w tytuł panelu Filtrowanie. Następnie należy wpisać wyszukiwaną frazę lub
zaznaczyć dostępne opcje filtrowania, a następnie kliknąć przycisk .
Filtrowanie powiadomień

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.7.1.1 Powiadomienia WebPush
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
W Systemie c-KOB funkcjonują także powiadomienia typu WebPush i są one dedykowane urządzeniom
mobilnym. Aktywowanie powiadomień WebPush wymaga kliknięcia ikony , znajdującej się pod
tabelą powiadomień. Aktywność wiadomości WebPush oznaczona jest zmianą koloru wspomnianej
ikony na kolor zielony.
Profil użytkownika – powiadomienia WebPush
Profil użytkownika – powiadomienia WebPush włączone

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.7.2 Dane użytkownika
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
Okno Dane użytkownika zawiera zestaw szczegółowych informacji na temat użytkownika Systemu
c-KOB. Część informacji zawartych w tej sekcji jest zapisywanych podczas rejestracji konta, jednak
po tym procesie należy uzupełnić pozostałe wymagane informacje dotyczące użytkownika,
w szczególności dane teleadresowe oraz informacje o uprawnieniach zawodowych (szczególnie ważne
dla interesariuszy KOB).
3.7.2.1 Informacje podstawowe
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
W sekcji Informacje podstawowe znajdują się dane użytkownika dotyczące konta użytkownika:
• Nazwa użytkownika – to adres e-mail;
• Typ podmiotu – wskazywany przy rejestracji konta użytkownika;
• Nadrzędna rola użytkowania – informacja o głównej roli użytkownika w Systemie
(interesariusz lub przedstawiciel organu administracji);
• Sposób logowania do Systemu c-KOB – możliwe opcje to logowanie przez System c-KOB
i logowanie przez Węzeł Krajowy.
• Data utworzenia konta;
• Data aktywacji konta;
• Informacja czy konto jest zablokowane;
Dane użytkownika – sekcja Informacje podstawowego
Uwaga: Modyfikacja informacji o użytkowniku zawartych w sekcji Dane użytkownika w ograniczonym zakresie jest możliwa
do wykonania przez osoby posiadające uprawnienia do modyfikacji kont użytkowników Systemu c-KOB (administratorów
Systemu).
W sekcji informacji podstawowych znajduje się przycisk do zmiany hasła . Procedura
zmiany hasła została opisana poniżej.

### Tabela:
| Uwaga: Modyfikacja informacji o użytkowniku zawartych w sekcji Dane użytkownika w ograniczonym zakresie jest możliwa |
| --- |
| do wykonania przez osoby posiadające uprawnienia do modyfikacji kont użytkowników Systemu c-KOB (administratorów |
| Systemu). |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.7.2.2 Dane kontaktowe
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
W sekcji Dane kontaktowe znajdują się dane teleadresowe użytkownika:
• Numery telefonów;
• Adres skrzynki ePUAP;
• Adres zamieszkania lub siedziby;
• Opcja wprowadzenia adresu do korespondencji w przypadku, jeśli jest inny niż adres
zamieszkana/siedziby.
Dane użytkownika – sekcja Dane kontaktowe, Adres zamieszkania/siedziby
Użytkownik może edytować dane w tej sekcji.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.7.2.3 Regulaminy i zgody
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
W sekcji Regulaminy i zgody znajduje się zestawienie regulaminów i zgód funkcjonujących w Systemie
wraz ze wskazaniem na aktualny stan ich akceptacji przez użytkownika.
Dane użytkownika – sekcja Regulaminy i zgody
Uwaga: Użytkownik może modyfikować akceptacje regulaminów/zgód tylko w zakresie tych pozycji, które nie mają statusu
obligatoryjnych do akceptacji.
3.7.2.4 Uprawnienia zawodowe
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
Użytkownik Systemu c-KOB może wskazać jakie uprawnienia zawodowe posiada. Jest to istotne
w szczególności w przypadku osób przeprowadzających kontrole obiektu. Uzupełnienie tych informacji
nie jest wymagane, a ich brak nie blokuje możliwości obsługi Systemu.
Uwaga: Użytkownik pełniący funkcję Osoby przeprowadzającej kontrole w kontekście co najmniej jednej KOB musi
wprowadzić dane dotyczące posiadanych uprawnień do przeprowadzania kontroli, o których mowa w art. 62 ust. 1 Prawa
Budowlanego.
W celu dodania uprawnień zawodowych ręcznie należy kliknąć ikonę , następnie uzupełnić
formularz oraz dodać dokumenty potwierdzające posiadanie uprawnień.
Definiowanie uprawnień zawodowych

### Tabela:
| Uwaga: Użytkownik może modyfikować akceptacje regulaminów/zgód tylko w zakresie tych pozycji, które nie mają statusu |
| --- |
| obligatoryjnych do akceptacji. |

### Tabela:
| Uwaga: Użytkownik pełniący funkcję Osoby przeprowadzającej kontrole w kontekście co najmniej jednej KOB musi |
| --- |
| wprowadzić dane dotyczące posiadanych uprawnień do przeprowadzania kontroli, o których mowa w art. 62 ust. 1 Prawa |
| Budowlanego. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Wprowadzone dane należy zapisać klikając przycisk . Po zapisaniu danych w formularzu, obok
nazwy skanu uprawnień pojawi się dodatkowa ikona , umożliwiająca pobranie dołączonych
dokumentów na dysk komputera.
Możliwe jest dodanie większej liczby uprawnień – wówczas każdorazowo należy kliknąć ikonę .
Usunięcie uprawnienia jest możliwe poprzez kliknięcie w przycisk .
Uprawnienia zawodowe można również zaimportować z Systemu eCRUB. W tym celu należy kliknąć
przycisk , następnie podać numer PESEL użytkownika i potwierdzić go klikając
.
Formularz importu uprawnień zawodowych z Sytemu eCRUB
Uprawnienia zawodowe pobrane z Sytemu eCRUB
Aby uprawnienia mogły zostać zapisane należy dodać dokument potwierdzający posiadanie danych
kwalifikacji zawodowych. W tym celu należy kliknąć przycisk i wskazać z dysku
komputera odpowiedni plik. Po załadowaniu się pliku będzie on widoczny pod wprowadzonym
uprawnieniem.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Dokument potwierdzający posiadanie uprawnień
Aby zmienić przesłany plik należy kliknąć ikonę i ponownie klikając przycisk wskazać
z dysku komputera właściwy plik.
Wprowadzone dane należy zapisać klikając przycisk .
3.7.2.5 Zmiana hasła
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
W celu zmiany hasła konta użytkownika należy kliknąć przycisk Zmień hasło.
Uruchomienie zmiany hasła do konta użytkownika
Na formularzu zmiany hasła należy wpisać i potwierdzić nowe hasło, następnie kliknąć przycisk Zmień.
Formularz zmiany hasła

---
<!-- SOURCE: c-KOB_Instrukcja dla osoby prowadzącej książkę.pdf -->
## Źródło: c-KOB_Instrukcja dla osoby prowadzącej książkę.pdf

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Instrukcja użytkownika
System c-KOB
wersja dla osoby upoważnionej
do prowadzania CKOB (UPK)
Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Spis treści
SŁOWNIK RÓL UŻYTKOWNIKÓW ........................................................................................................... 3
1. WSTĘP ................................................................................................................................... 4
1.1 Cel dokumentu ........................................................................................................................ 4
1.2 Struktura dokumentu .............................................................................................................. 4
2. OPIS APLIKACJI ......................................................................................................................... 4
3. FUNKCJE APLIKACJI .................................................................................................................... 5
3.1 Strona startowa ....................................................................................................................... 5
3.2 Rejestracja konta użytkownika ................................................................................................ 6
3.2.1 Rejestracja konta interesariusza ..................................................................................... 6
3.3 Logowanie do Systemu ............................................................................................................ 8
3.3.1 Logowanie do Systemu za pośrednictwem Węzła Krajowego (WK)................................ 8
3.3.2 Logowanie do Systemu za pośrednictwem konta c-KOB ................................................. 8
3.3.3 Wylogowanie z Systemu .................................................................................................. 9
3.4 Wybór roli .............................................................................................................................. 10
3.5 Rejestr KOB ............................................................................................................................ 10
3.5.1 Przeglądanie rejestru KOB ............................................................................................. 10
3.5.2 Filtrowanie danych ........................................................................................................ 13
3.5.3 Podgląd metryki KOB ..................................................................................................... 14
3.5.4 Informacje o obiekcie budowlanym ............................................................................... 17
3.5.5 Dane o właścicielu i zarządcy ........................................................................................ 20
3.5.6 Interesariusze KOB ......................................................................................................... 22
3.5.7 Wpisy do Książki obiektu budowlanego ........................................................................ 36
3.5.8 Zmiana statusu KOB ...................................................................................................... 44
3.5.9 Eksport zestawień do pliku ............................................................................................ 46
3.5.10 Eksport KOB do pliku PDF .............................................................................................. 47
3.5.11 Weryfikacja sumy kontrolnej ......................................................................................... 49
3.6 Profil użytkownika ................................................................................................................. 50
3.6.1 Powiadomienia .............................................................................................................. 50

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.6.2 Dane użytkownika ......................................................................................................... 53
Słownik ról użytkowników
Role użytkowników Systemu c-KOB:
• Administrator,
• Lokalny administrator,
• Przedstawiciel Nadzoru Budowlanego,
• Przedstawiciel organu innego niż Nadzór Budowlany lub służb uprawnionych do kontroli
przestrzegania przepisów w zakresie utrzymania obiektów budowlanych lub do prowadzenia
działań ratowniczych,
• Interesariusz KOB:
o Właściciel/zarządca bądź osoba uprawniona do reprezentowania właściciela/zarządcy
(WZ),
o Osoba upoważniona do prowadzenia KOB (UPK),
o Osoba przeprowadzająca kontrole (OPK).

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
1. Wstęp
Niniejszy dokument stanowi Podręcznik użytkownika do Systemu Cyfrowej Książki Obiektu
Budowlanego (System c-KOB).
1.1 Cel dokumentu
Celem dokumentu jest prezentacja sposobu użytkowania Systemu Cyfrowej Książki Obiektu
Budowlanego.
1.2 Struktura dokumentu
Niniejszy dokument obejmuje:
• Rozdział 1 Wstęp – opis celu i struktury dokumentu.
• Rozdział 2 Opis aplikacji – ogólny opis aplikacji, tj. przeznaczenie, zadania, które można
realizować przy jej pomocy, rodzaje użytkowników aplikacji itp.
• Rozdział 3 Funkcje aplikacji – opis przeznaczenia i działania poszczególnych funkcji Systemu.
Wskazanie najważniejszych elementów potrzebnych do prawidłowego działania
funkcjonalności. Całość dopełniają zrzuty ekranowe z Systemu.
2. Opis aplikacji
System Cyfrowej Książki Obiektu Budowlanego przeznaczony jest do prowadzenia książki obiektu
budowlanego w postaci cyfrowej.
Cyfrowa Książka Obiektu Budowlanego (CKOB) zakładana jest przez właściciela/zarządcę bądź osobę
uprawnioną do reprezentowania właściciela/zarządcy obiektu budowlanego, po uprzednim
utworzeniu konta w Systemie, bez udziału organów administracji publicznej.
System c-KOB jest dostępny do bezpłatnego i powszechnego użytkowania. Odbiorcami usług będą:
• przedstawiciele organów nadzoru budowlanego (PINB, WINB, GINB);
• przedstawiciele służb takich jak: Policja, Państwowa Straż Pożarna, prokuratura, inspekcja
sanitarna, ochrona zabytków, itp.;
• właściciele/zarządcy bądź osoby uprawnione do reprezentowania właścicieli/zarządców
obiektów budowlanych (WZ);
• osoby upoważnione do prowadzenia danej CKOB (UPK),
• osoby przeprowadzające kontrole danego obiektu budowlanego (OPK).

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3. Funkcje aplikacji
W niniejszej części zamieszczone zostały opisy funkcji oraz sposób działania narzędzi dostępnych dla
użytkowników c-KOB.
3.1 Strona startowa
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
Strona startowa Cyfrowej Książki Obiektu Budowlanego jest dostępna pod adresem
https://c-kob.gunb.gov.pl/. Znajdują się na niej podstawowe oraz bieżące informacje dotyczące
Systemu c-KOB oraz Książki Obiektu Budowlanego (KOB).
Z tego miejsca można rozpocząć pracę z książką obiektu budowlanego rejestrując i logując się
w Systemie c-KOB.
Strona startowa Systemu c-KOB

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.2 Rejestracja konta użytkownika
3.2.1 Rejestracja konta interesariusza
Funkcjonalność aplikacji dostępna dla użytkowników w roli: interesariusz KOB.
Rejestracja służy do zakładania nowego konta użytkownika Systemu.
Uwaga! Osoby fizyczne funkcjonujące jako użytkownicy-interesariusze KOB logując się do Systemu c-KOB po raz pierwszy
muszą to zrobić za pośrednictwem Krajowego Węzła Identyfikacji Elektronicznej (WK) – ma to na celu potwierdzenie
tożsamości. Kolejne logowania mogą być już wykonywane za pośrednictwem panelu logowania Systemu c-KOB.
Domyślnie, po upływie 180 dni od ostatniego logowania do Systemu za pośrednictwem WK, System c-KOB poprosi
o ponowne logowanie przez WK w celu ponownej weryfikacji tożsamości.
W celu założenia konta interesariusza należy uruchomić https://c-kob.gunb.gov.pl/ i wykonać
następujące kroki:
1. Kliknąć przycisk znajdujący się w prawym górnym rogu portalu c-KOB.
2. W wyświetlonym oknie logowania należy kliknąć przycisk Zaloguj się Węzłem Krajowym.
W wyniku kliknięcia otwarta zostanie strona logowania Węzła Krajowego.
3. Następnie zalogować się jednym ze sposób logowania dostępnych w Węźle Krajowym:
Logowanie poprzez Węzeł Krajowy
4. Poprawnie przeprowadzona autoryzacja użytkownika w Węźle Krajowym spowoduje zwrotne
przekierowanie użytkownika do strony c-KOB oraz wyświetlenie okna, w którym należy podać
adres e-mail, który pełnić będzie rolę identyfikatora użytkownika w Systemie oraz służyć do
logowania się do Systemu (login) oraz komunikacji w ramach procesów związanych z obsługą
CKOB, następnie należy podać hasło do logowania do konta użytkownika w Systemie c-KOB
oraz zatwierdzić ewentualne wymagane oświadczenia, regulaminy i zgody (w postaci
checkboxów).

### Tabela:
| Uwaga! Osoby fizyczne funkcjonujące jako użytkownicy-interesariusze KOB logując się do Systemu c-KOB po raz pierwszy |
| --- |
| muszą to zrobić za pośrednictwem Krajowego Węzła Identyfikacji Elektronicznej (WK) – ma to na celu potwierdzenie |
| tożsamości. Kolejne logowania mogą być już wykonywane za pośrednictwem panelu logowania Systemu c-KOB. |
| Domyślnie, po upływie 180 dni od ostatniego logowania do Systemu za pośrednictwem WK, System c-KOB poprosi |
| o ponowne logowanie przez WK w celu ponownej weryfikacji tożsamości. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Potwierdzenie danych w procesie rejestracji konta użytkownika interesariusza
5. Proces rejestracji konta należy zakończyć klikając przycisk Potwierdź email, po czym System
automatycznie dokona pierwszego zalogowania użytkownika oraz przekierowania w Systemie
c-KOB do modułu Rejestr KOB (nie jest konieczna dodatkowa aktywacja konta).
W przypadku wprowadzenia adresu e-mail, który funkcjonuje już w Systemie c-KOB jako przypisany do innego konta
użytkownika, System c-KOB wyświetli komunikat o treści: Podany adres e-mail został już przypisany do innego konta
użytkownika i nie może zostać wykorzystany ponownie.
Komunikat wskazujący na ponowne użycie już zarejestrowanego adresu e-mail

### Tabela:
| W przypadku wprowadzenia adresu e-mail, który funkcjonuje już w Systemie c-KOB jako przypisany do innego konta |
| --- |
| użytkownika, System c-KOB wyświetli komunikat o treści: Podany adres e-mail został już przypisany do innego konta |
| użytkownika i nie może zostać wykorzystany ponownie. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.3 Logowanie do Systemu
3.3.1 Logowanie do Systemu za pośrednictwem Węzła Krajowego (WK)
Funkcjonalność aplikacji dostępna dla użytkowników w roli: interesariusz KOB.
Aby korzystać z funkcjonalności dostępnych dla zalogowanych użytkowników konieczne jest
zalogowanie do Systemu c-KOB.
W celu logowania do Systemu c-KOB przez Węzeł Krajowy należy wykonać następujące kroki:
1. Uruchomić Portal Systemu c-KOB, kliknąć przycisk znajdujący się w prawym
górnym rogu strony głównej portalu.
2. W wyświetlonym oknie logowania należy kliknąć przycisk Zaloguj się Węzłem Krajowym,
następnie zalogować się jednym ze sposób logowania dostępnych w ramach Węzła Krajowego.
Logowanie poprzez proxy Węzła Krajowego
3. Jeśli poprawnie zweryfikowano uprawnienia użytkownika zostanie on zalogowany do Systemu,
w przeciwnym razie wyświetlony zostanie komunikat o braku uprawnień.
3.3.2 Logowanie do Systemu za pośrednictwem konta c-KOB
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
Aby korzystać z funkcjonalności dostępnych dla zalogowanych użytkowników konieczne jest
zalogowanie do Systemu c-KOB.
W celu logowania do Systemu c-KOB należy wykonać następujące kroki:
1. Uruchomić Portal Systemu c-KOB i kliknąć przycisk znajdujący się w górnym
rogu portalu Systemu.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
2. W wyświetlonym oknie logowania użytkownik powinien wpisać dane autoryzacyjne w polu
E-mail i Hasło, a następnie kliknąć przycisk Zaloguj.
Logowanie do Systemu c-KOB
Uwaga: Logowanie do Systemu jest możliwe po aktywacji konta przez użytkownika i odblokowaniu konta przez
Administratora c-KOB.
3.3.3 Wylogowanie z Systemu
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
Po zakończeniu pracy w Systemie konieczne jest wylogowanie się z Systemu. Aby to zrobić, należy
kliknąć na pozycję Wyloguj znajdującą się na ostatnim miejscu w Menu Systemu.
Wylogowanie użytkownika z Systemu c-KOB

### Tabela:
| Uwaga: Logowanie do Systemu jest możliwe po aktywacji konta przez użytkownika i odblokowaniu konta przez |
| --- |
| Administratora c-KOB. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.4 Wybór roli
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
Widok Wybór roli umożliwia zmianę (bez konieczności ponownego logowania się do c-KOB) funkcji
(roli) użytkownika Systemu pełnionej w kontekście wszystkich książek obiektów budowlanych, do
których obsługi został on zaproszony.
Domyślnie logowanie użytkownika pozwala na wyświetlenie w Systemie wszystkich danych
powiązanych z użytkownikiem, zależnych od funkcji „Właściciel / Zarządca” pełnionej w ramach
konkretnej książki obiektu budowlanego. Przy użyciu opcji zamieszczonych w sekcji Wybór roli
użytkownik może wskazać określoną rolę na jego liście ról, dzięki czemu rejestr książek obiektów
budowlanych będzie zawierał wyłącznie pozycje odpowiadające wskazanej roli (funkcji) interesariusza.
Uwaga: Widok ten pojawi się również podczas logowania do Systemu c-KOB. Jeśli użytkownik ma przypisaną wyłącznie
jedną rolę w Systemie, widok ten nie pojawi się w aplikacji c-KOB.
Panel Wybór roli w Systemie c-KOB
3.5 Rejestr KOB
3.5.1 Przeglądanie rejestru KOB
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
W celu przeglądania rejestru książek obiektów budowlanych należy w menu kliknąć pozycję Rejestr
KOB. System wyświetli wtedy okno zawierające wykaz książek obiektów budowlanych, do których
dostęp ma zalogowany użytkownik.

### Tabela:
| Uwaga: Widok ten pojawi się również podczas logowania do Systemu c-KOB. Jeśli użytkownik ma przypisaną wyłącznie |
| --- |
| jedną rolę w Systemie, widok ten nie pojawi się w aplikacji c-KOB. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Rejestr KOB
Opcje przeglądania rejestru
• Kliknięcie w nagłówek kolumny powoduje jej sortowanie. Strzałka poniżej nazwy kolumny
wskazuje typ sortowania: sortowanie rosnące, sortowanie malejące.
• Rejestr domyślnie wyświetla 5 rekordów danych, liczbę tą można dostosować do własnych
potrzeb za pomocą panelu Wiersze na stronie znajdującego się na pasku nawigacji w prawym
dolnym rogu rejestru.
Pasek nawigacji po stronach rejestru – parametr liczby wierszy na stronie
• Na pasku nawigacji znajduje się informacja o łącznej liczbie wierszy w tabeli oraz liczbie wierszy
aktualnie wyświetlanych na aktywnej stronie.
Pasek nawigacji po stronach rejestru – informacje o liczbie wierszy w tabeli oraz bieżących wierszach na stronie
• Przycisk służy do przejścia na poprzednią stronę rejestru, a przycisk do wyświetlenia
kolejnej strony.
Dodatkowe opcje dostępne w oknie Rejestr KOB
• Przycisk służy do wyświetlenia podglądu metryki KOB. Temat szerzej opisany został
w osobnym rozdziale.
• Przycisk służy do wyświetlenia opcji obsługi CKOB w postaci menu narzędziowego. Lista
opcji widocznych w menu narzędziowym zależy od uprawnień i roli użytkownika oraz od
aktualnego statusu CKOB i wpisów do niej wprowadzonych.
o Przyjęcie roli – opcja dostępna dla osób zaproszonych do pełnienia danej roli (WZ,
OPK, UPK) w danej CKOB; opcja ta znika z menu po przyjęciu zaproszenia.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
o Odrzucenie roli – opcja dostępna dla osób zaproszonych do pełnienia danej roli (WZ,
OPK, UPK) w danej CKOB; opcja ta znika z menu po odrzuceniu zaproszenia.
o Przekaż dostęp – opcja dostępna wyłącznie dla użytkowników w roli WZ w kontekście
danej CKOB.
o Wpisy – opcja dostępna dla wszystkich użytkowników uprawnionych do przeglądania
wpisów w danej CKOB.
o Interesariusze KOB – opcja dostępna dla wszystkich użytkowników uprawnionych do
przeglądania rejestru interesariuszy danej CKOB.
o Informacje o obiekcie budowlanym – opcja dostępna dla wszystkich użytkowników
uprawnionych do odczytu metryki danej CKOB.
o Dane właściciela/zarządcy obiektu (bądź osoby uprawnionej do reprezentowania
właściciela/zarządcy) – opcja dostępna dla wszystkich użytkowników uprawnionych do
odczytu metryki danej CKOB.
o Zmień status KOB – opcja dostępna dla wszystkich użytkowników uprawnionych do
zamknięcia i ponownego otwarcia CKOB.
o Eksportuj KOB do PDF – opcja dostępna dla wszystkich użytkowników uprawnionych
do eksportu/wydruku danej CKOB do pliku PDF.
o Wyślij protokół z kontroli – opcja dostępna dla użytkownika w roli OPK, jeżeli w danej
CKOB istnieje wpis z kontroli, dla której wymagane jest przesłanie protokołu
pokontrolnego do organu nadzoru budowlanego (opcja jest niewidoczna, jeśli protokół
z kontroli został już wysłany).
o Wyślij zawiadomienie o kontroli – opcja dostępna dla użytkownika w roli OPK, jeżeli
istnieje wpis z kontroli, dla której wymagane jest przesłanie zawiadomienia
o przeprowadzonej kontroli (opcja jest niewidoczna, jeśli zawiadomienie o kontroli
zostało już wysłane).
o Rezygnuj z pełnionej roli – opcja dostępna dla OPK i UPK.
o Weryfikacja sumy kontrolnej – opcja dostępna dla wszystkich użytkowników.
• Przycisk służy do wyświetlenia formularza Załóż nową książkę obiektu
budowlanego. Temat szerzej opisany został w odrębnym rozdziale.
• Przycisk służy do eksportu bieżącej listy książek do pliku PDF, CSV,
XLS. Temat szerzej opisany został w odrębnym rozdziale.
• Panel służy do filtrowania rejestru książek obiektów budowlanych
użytkownika. Temat szerzej opisany został w kolejnym rozdziale.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.5.2 Filtrowanie danych
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
Użytkownik może przeglądać i wyszukiwać CKOB używając narzędzi filtrowania. W celu filtrowania
danych należy kliknąć w tytuł panelu Filtrowanie.
Rozwinięcie/zwinięcie panelu Filtrowanie rejestru
Następnie należy wpisać wyszukiwaną frazę lub zaznaczyć dostępne opcje filtrowania, po czym kliknąć
przycisk .
Kliknięcie ikony kasuje frazę filtrowania wpisaną w danym polu.
Przycisk usuwa wszystkie wpisane frazy i wybrane opcje filtrowania.
Panel Filtrowanie – widok filtrów dla rejestru KOB
W rejestrze zostaną wyświetlone dane spełniające warunki założonych filtrów. Nagłówek panelu
Filtrowanie zmienia kolor na czerwony oraz zostaje oznaczony „*” co informuje użytkownika
o założeniu filtru na danych w rejestrze.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Panel Filtrowanie – oznaczenie aktywnego filtru danych
3.5.3 Podgląd metryki KOB
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
W celu wyświetlenia podglądu metryki książki obiektu budowlanego należy kliknąć ikonę
znajdującą się w kolumnie Metryka KOB rejestru KOB.
Rejestr KOB – wywołanie podglądu metryki KOB
Uwaga: Metryki KOB nie można modyfikować. Dane na metryce są danymi, które są możliwe do edycji z poziomu
formularzy: Informacje o obiekcie budowlanym oraz Dane właściciela/zarządcy bądź osoby uprawnionej do
reprezentowania właściciela/zarządcy obiektu.
Opcje obsługi okna podglądu metryki książki obiektów budowlanych
Powrót do rejestru książek obiektów budowlanych.
Podgląd wersji archiwalnych metryki KOB (powstałych
w wyniku korekty danych dotyczących obiektu budowlanego
oraz danych właściciela/zarządcy lub osoby uprawnionej do
reprezentowania właściciela/zarządcy). Opcja dostępna dla
użytkowników posiadających uprawnienia do odczytu historii
korekt metryki KOB.

### Tabela:
| Uwaga: Metryki KOB nie można modyfikować. Dane na metryce są danymi, które są możliwe do edycji z poziomu |
| --- |
| formularzy: Informacje o obiekcie budowlanym oraz Dane właściciela/zarządcy bądź osoby uprawnionej do |
| reprezentowania właściciela/zarządcy obiektu. |

### Tabela:
|  | Powrót do rejestru książek obiektów budowlanych. |
| --- | --- |
|  | Podgląd wersji archiwalnych metryki KOB (powstałych w wyniku korekty danych dotyczących obiektu budowlanego oraz danych właściciela/zarządcy lub osoby uprawnionej do reprezentowania właściciela/zarządcy). Opcja dostępna dla użytkowników posiadających uprawnienia do odczytu historii korekt metryki KOB. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Rejestr KOB – podgląd metryki KOB cz.1

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Rejestr KOB – podgląd metryki KOB cz.2

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.5.4 Informacje o obiekcie budowlanym
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
W celu wyświetlenia informacji o obiekcie budowlanym należy w menu narzędziowym książki obiektu
budowlanego kliknąć pozycję Informacje o obiekcie budowlanym.
Rejestr KOB – wywołanie okna Informacje o obiekcie budowlanym
Podgląd informacji o obiekcie budowlanym – sekcja Obiekt budowlany

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Podgląd informacji o obiekcie budowlanym – sekcja Wymagane kontrole okresowe
Podgląd informacji o obiekcie budowlanym – sekcja Plan sytuacyjny oraz Załączniki

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Podgląd informacji o obiekcie budowlanym – sekcja lokalizacji obiektu budowlanego (adres, lokalizacja wg EGiB)
Podgląd informacji o obiekcie budowlanym – sekcja Właściwy organ nadzoru budowlanego

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Opcje obsługi okna zawierającego informacje o obiekcie budowlanym.
Powrót do rejestru książek obiektów budowlanych.
Podgląd wersji archiwalnych metryki KOB (powstałych w wyniku korekty
danych dotyczących obiektu budowlanego). Opcja dostępna dla
użytkowników posiadających uprawnienia do odczytu historii korekt metryki
KOB.
Uruchomienie formularza korekty informacji o obiekcie budowlanym. Opcja
wymaga uprawnienia do redakcji formularza Informacji o obiekcie (tablica I).
3.5.5 Dane o właścicielu i zarządcy
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
W celu wyświetlenia informacji o właścicielu/zarządcy lub osoby uprawnionej do reprezentowania
właściciela/zarządcy obiektu należy w menu narzędziowym książki obiektu budowlanego kliknąć
pozycję Dane właściciela/zarządcy obiektu.
Rejestr KOB – wywołanie okna Dane właściciela/zarządcy obiektu budowlanego

### Tabela:
|  | Powrót do rejestru książek obiektów budowlanych. |
| --- | --- |
|  | Podgląd wersji archiwalnych metryki KOB (powstałych w wyniku korekty danych dotyczących obiektu budowlanego). Opcja dostępna dla użytkowników posiadających uprawnienia do odczytu historii korekt metryki KOB. |
|  | Uruchomienie formularza korekty informacji o obiekcie budowlanym. Opcja wymaga uprawnienia do redakcji formularza Informacji o obiekcie (tablica I). |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Dane właściciela/zarządcy obiektu budowlanego
Opcje obsługi okna zawierającego informacje o danych właściciela/zarządcy obiektu budowlanego:
Powrót do rejestru książek obiektów budowlanych.
Podgląd wersji archiwalnych metryki KOB (powstałych w wyniku korekty
danych właściciela/zarządcy bądź osoby uprawnionej do reprezentowania
właściciela/zarządcy). Opcja dostępna dla użytkowników posiadających
uprawnienia do odczytu historii korekt metryki KOB.
Aktywowanie korekty informacji właściciel/zarządca bądź osoba uprawniona
do reprezentowania właściciela/zarządcy obiektu budowlanego. Opcja
wymaga uprawnienia do redakcji formularza Podmiot zakładający KOB
(tablica II).
Usuwanie informacji właściciel/zarządca bądź osoba uprawniona do
reprezentowania właściciela/zarządcy obiektu budowlanego w celu
ponownego uzupełnienia danych. Opcja wymaga uprawnienia do redakcji
formularza Podmiot zakładający KOB (tablica II).

### Tabela:
|  | Powrót do rejestru książek obiektów budowlanych. |
| --- | --- |
|  | Podgląd wersji archiwalnych metryki KOB (powstałych w wyniku korekty danych właściciela/zarządcy bądź osoby uprawnionej do reprezentowania właściciela/zarządcy). Opcja dostępna dla użytkowników posiadających uprawnienia do odczytu historii korekt metryki KOB. |
|  | Aktywowanie korekty informacji właściciel/zarządca bądź osoba uprawniona do reprezentowania właściciela/zarządcy obiektu budowlanego. Opcja wymaga uprawnienia do redakcji formularza Podmiot zakładający KOB (tablica II). |
|  | Usuwanie informacji właściciel/zarządca bądź osoba uprawniona do reprezentowania właściciela/zarządcy obiektu budowlanego w celu ponownego uzupełnienia danych. Opcja wymaga uprawnienia do redakcji formularza Podmiot zakładający KOB (tablica II). |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.5.6 Interesariusze KOB
Funkcjonalność aplikacji w zakresie podglądu rejestru interesariuszy danej CKOB dostępna dla użytkowników w roli:
administrator, lokalny administrator, przedstawiciel nadzoru budowlanego, przedstawiciel organu innego niż NB lub służb
uprawnionych do kontroli przestrzegania przepisów w zakresie utrzymania obiektów budowlanych lub do prowadzenia
działań ratowniczych, osoba przeprowadzająca kontrole.
Funkcjonalność aplikacji w zakresie edycji rejestru interesariuszy danej CKOB dostępna dla użytkowników w roli:
właściciel/zarządca, osoba upoważniona do prowadzenia KOB.
W momencie zakładania książki obiektu budowlanego do grupy interesariuszy zostaje automatycznie
dodany użytkownik tworzący KOB w funkcji właściciel/zarządca bądź osoba uprawniona do
reprezentowania właściciela/zarządcy. Zakładający książkę bezpośrednio po jej utworzeniu musi
wskazać osobę upoważnioną do prowadzania KOB lub samemu przyjąć taką funkcję.
Kolejnych interesariuszy mogą dodawać właściciele i zarządcy (WZ) oraz osoby upoważnione do
prowadzania KOB (UPK).
W celu dodania interesariusza, z menu narzędziowego danej książki obiektu budowlanego, należy
wybrać opcję Interesariusze KOB.
Rejestr KOB – uruchomienie formularza obsługi interesariuszy
W wyświetlonym formularzu Interesariusze książki obiektu budowlanego widoczni są domyślnie
ci interesariusze, których funkcje w ramach danej książki obiektu budowlanego są aktywne (czyli
potwierdzili objęcie funkcji w kontekście przeglądanej CKOB). Widok ten można zmienić klikając na
suwak Pokaż tylko zatwierdzonych. Opcja Pokaż tylko aktualnych pozwala na wyświetlenie widoku
zestawienia interesariuszy, którzy posiadają aktywny dostęp do danej książki obiektu budowlanego.
Kolorem czerwonym oznaczono interesariuszy, którzy dotychczas nie przyjęli funkcji.
Formularz obsługi interesariusza – widok interesariusza, który nie przyjął funkcji

### Tabela:
| Funkcjonalność aplikacji w zakresie podglądu rejestru interesariuszy danej CKOB dostępna dla użytkowników w roli: |
| --- |
| administrator, lokalny administrator, przedstawiciel nadzoru budowlanego, przedstawiciel organu innego niż NB lub służb |
| uprawnionych do kontroli przestrzegania przepisów w zakresie utrzymania obiektów budowlanych lub do prowadzenia |
| działań ratowniczych, osoba przeprowadzająca kontrole. |
| Funkcjonalność aplikacji w zakresie edycji rejestru interesariuszy danej CKOB dostępna dla użytkowników w roli: |
| właściciel/zarządca, osoba upoważniona do prowadzenia KOB. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
W celu dodania nowego interesariusza, należy kliknąć przycisk .
Uwaga: Przycisk ten widoczny jest na formularzu wyłącznie dla użytkowników Systemu c-KOB posiadających odpowiednie
uprawnienie.
Formularz obsługi interesariusza – uruchomienie dodania nowego interesariusza
W wyświetlonym formularzu należy wskazać docelową funkcję interesariusza, podać jego adres e-mail
oraz wskazać datę rozpoczęcia pełnienia wskazanej funkcji w ramach CKOB. Podanie PESEL nie jest na
tym etapie niezbędne, informacja ta może zostać późnej uzupełniona przez samego interesariusza za
pośrednictwem formularza Dane użytkownika.
Formularz dodania interesariusza
Data wygaśnięcia obowiązków jest uzupełniana w sytuacji, kiedy interesariusz otrzymuje czasowy
dostęp do książki obiektu budowlanego. Taki dostęp można określić w dolnym momencie,
wykorzystując opcję Ustaw dostęp czasowy, możliwą do wywołania z poziomu menu narzędziowego
danego interesariusza. Opis tej funkcjonalności znajduje się w dalszej części instrukcji.
Ostatnim krokiem jest potwierdzenie dodania interesariusza przez kliknięcie przycisku
, po którym System wyświetli informację o dodaniu nowego interesariusza do KOB.
W przypadku, gdy wskazana osoba nie posiada konta użytkownika w Systemie c-KOB, System
wyświetla komunikat z prośbą o potwierdzenie chęci dodania interesariusza.

### Tabela:
| Uwaga: Przycisk ten widoczny jest na formularzu wyłącznie dla użytkowników Systemu c-KOB posiadających odpowiednie |
| --- |
| uprawnienie. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Potwierdzenie dodania interesariusza
Po kliknięciu przycisku TAK, dane nowego interesariusza zostaną zapisane w Systemie, a na wskazany
adres e-mail wysłana zostanie wiadomość e-mail z zaproszeniem do rejestracji w Systemie c-KOB oraz
linkiem do przyjęcia zaproszenia do pełnienia funkcji w kontekście danej CKOB. Ten krok zostanie
potwierdzony komunikatem o treści jak na poniższym zrzucie ekranowym:
Informacja systemowa po dodaniu interesariusza
W celu weryfikacji poprawności przypisania interesariusza do książki obiektu budowlanego, należy
zmienić konfigurację domyślnych filtrów w tabeli zestawienia interesariuszy, wyłączając opcję Pokaż
tylko zatwierdzonych. Po wyłączeniu tej opcji w tabeli widoczni są również interesariusze, którzy nie
potwierdzili jeszcze objęcia funkcji w danej CKOB. Osoby te są oznaczone kolorem czerwonym oraz nie
mają uzupełnionej daty przyjęcia obowiązków.
Formularz obsługi interesariuszy – widok nowo dodanego interesariusza, który oczekuje na przyjęcie zaproszenia do objęcia funkcji
Dodatkowe opcje obsługi interesariuszy KOB
Podgląd informacji nt. interesariusza można uzyskać po kliknięciu ikony .
Powrót do rejestru interesariuszy KOB.
Zestaw narzędzi do obsługi interesariuszy KOB znajduje się w menu podręcznym.

### Tabela:
|  | Powrót do rejestru interesariuszy KOB. |
| --- | --- |
|  | Zestaw narzędzi do obsługi interesariuszy KOB znajduje się w menu podręcznym. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Formularz obsługi interesariusza – wyświetlenie informacji o interesariuszu
Formularz obsługi interesariusza – podgląd informacji o interesariuszu
Narzędzia obsługi interesariusza
Usuń przypisanego interesariusza - umożliwia pozbawienie dostępu do książki obiektu
budowlanego danego interesariusza. Usunięcie dostępu do książki wymaga potwierdzania - kliknięcie
w oknie zapytania. Data końca dostępu do książki obiektu budowlanego zostanie zapisana
i wyświetlona w rejestrze interesariuszy KOB w kolumnie Data wygaśnięcia obowiązków.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Potwierdzenie usunięcia dostępu do książki obiektu budowlanego
Ustaw dostęp czasowy - funkcjonalność ta umożliwia zdefiniowanie daty końca dostępu danego
użytkownika do książki obiektu budowlanego.
Formularz konfiguracji dostępu czasowego do książki obiektu budowlanego
Po zatwierdzeniu wyboru daty oraz kliknięciu przycisku Zapisz, data końca dostępu do książki obiektu
budowlanego zostanie zapisana i wyświetlona w rejestrze interesariuszy KOB w kolumnie Data
wygaśnięcia roli.
Rejestr interesariuszy po ustawieniu dostępu czasowego do książki

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Opcja Ustaw dostęp czasowy umożliwia również przywrócenie bezterminowego dostępu do książki
obiektu budowlanego. Aby to zrobić, należy kliknąć ikonę znajdującą się po prawej stronie daty
wygaśnięcia obowiązków.
Formularz ustawienia czasowego dostępu do książki obiektu budowlanego – ustawienie bezterminowego dostępu
Edytuj dodatkowe informacje - umożliwia dodanie dodatkowych informacji o interesariuszu KOB
nieprzewidzianych w formularzach systemowych.
Formularz edycji opisu dodatkowego interesariusza
3.5.6.1 Interesariusz nieposiadający konta w Systemie c-KOB
Funkcjonalność aplikacji dostępna dla użytkownika w roli: interesariusz KOB.
W przypadku dodawania do książki obiektu budowlanego interesariusza, który nie posiada konta
użytkownika w Systemie c-KOB, System po kliknięciu przycisku Zapisz wskaże, iż wymagane jest
uzupełnienie dodatkowych informacji o użytkowniku, umożliwiających jego identyfikację
i potwierdzenie tożsamości. Zapraszana do roli interesariusza osoba otrzyma wiadomość e-mail
z instrukcją dalszego postępowania.
Zatwierdzenie udziału w procesie obsługi CKOB będzie wymagało wcześniejszej rejestracji konta
użytkownika, a następnie potwierdzenia przyjęcia funkcji.
Rejestrację konta można przeprowadzić klikając w otrzymanej wiadomości przycisk Zaloguj się
Węzłem Krajowym.
Po rejestracji konta możliwe jest przystąpienie do zatwierdzenia funkcji interesariusza w ramach danej
CKOB, klikając przycisk Zatwierdź w wiadomości mailowej.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Wiadomość e-mail do użytkownika nieposiadającego konta w Systemie c-KOB z informacją
o procedurze rejestracji konta użytkownika i przyjęcia funkcji
3.5.6.2 Przyjęcie roli interesariusza
Funkcjonalność aplikacji dostępna dla użytkownika w roli: interesariusz KOB.
Objęcie roli przez interesariuszy zaproszonych do obsługi CKOB i formalne potwierdzenie przyjęcia
obowiązków do nich należących jest możliwe w Systemie na 3 sposoby:
1. Poprzez kliknięcie przycisku Zatwierdź w wiadomości e-mail;
2. Poprzez kliknięcie linku w powiadomieniu systemowym;
3. Poprzez wybranie opcji Przyjęcie roli w menu narzędziowym w Rejestrze KOB.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Ad. 1. Poniżej zamieszczony został przykład treści wiadomości e-mail z informacją o zaproszeniu do
grona interesariuszy w określonej roli w kontekście konkretnej CKOB.
Treść wiadomości e-mail z zaproszeniem do objęcia roli
W celu podjęcia się pełnienia danej roli w kontekście wskazanej CKOB, należy kliknąć przycisk
w przesłanej wiadomości e-mail.
Użytkownik zostanie przekierowany do Systemu c-KOB (jeśli nie jest on zalogowany wywołany zostanie
formularz logowania), w którym wyświetlone zostanie okno potwierdzenia objęcia przez interesariusza
wskazanej roli w danej CKOB.
Potwierdzenie przyjęcia roli
Ad. 2. Inną ścieżką do potwierdzenia przyjęcia obowiązków jest kliknięcie w link służący do przyjęcia
roli interesariusza w danej CKOB, który przesłany zostanie do użytkownika w powiadomieniu
systemowym.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Treść powiadomienia systemowego z informacją o zaproszeniu do objęcia roli
Ad. 3. Ostatnią możliwością przyjęcia roli interesariusza w danej CKOB jest wybór opcji Przyjęcie roli,
która jest dostępna w menu narzędziowym danej książki obiektu budowlanego.
Rejestr KOB – opcja przyjęcia roli
Po wybraniu tej opcji System wyświetli okno Przyjęcia roli interesariusza z informacją o numerze
książki obiektu budowlanego, nazwą obiektu budowlanego oraz rolą jaką obejmuje użytkownik w danej
CKOB. Użytkownik potwierdza objęcie roli klikając przycisk .
Rejestr KOB – potwierdzenie przyjęcia roli
Potwierdzenie zapisywane jest w bazie danych Systemu. Od tego momentu interesariusz otrzymuje
kolejne uprawnienia do obsługi książki obiektu budowlanego np.: możliwość dokonywania wpisów
w książce.
Właściciel/zarządca oraz osoba upoważniona do prowadzania danej CKOB są każdorazowo
informowani drogą mailową oraz poprzez powiadomienie systemowe o przyjęciu roli przez
interesariusza w ramach danej CKOB.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Powiadomienie systemowe – potwierdzenie przyjęcia roli
3.5.6.3 Odrzucenie roli interesariusza
Funkcjonalność aplikacji dostępna dla użytkownika w roli: interesariusz KOB.
Odrzucenie roli, podobnie jak jej przyjęcie, jest możliwe w Systemie na 3 sposoby:
1. Poprzez kliknięcie przycisku Odrzuć w wiadomości e-mail;
2. Poprzez kliknięcie linku w powiadomieniu systemowym;
3. Poprzez wybranie opcji Odrzucenie roli w menu narzędziowym w Rejestrze KOB.
Ad. 1. Poniżej zamieszczony został przykład treści wiadomości e-mail z informacją o zaproszeniu do
grona interesariuszy w określonej funkcji w kontekście konkretnej CKOB z możliwością przyjęcia
i odrzucenia roli.
Treść wiadomości e-mail z zaproszeniem do objęcia roli

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
W celu odrzucenia danej roli w kontekście wskazanej CKOB, należy kliknąć przycisk
w przesłanej wiadomości e-mail.
Użytkownik zostanie przekierowany do Systemu c-KOB (jeśli nie jest on zalogowany, wywołany
zostanie formularz logowania), w którym wyświetlone zostanie okno odrzucenia objęcia przez
interesariusza wskazanej funkcji w danej CKOB.
Ad. 2. Inną ścieżką do odrzucenia obowiązków jest kliknięcie w link służący do odrzucenia roli
interesariusza w danej CKOB, który przesłany zostanie do użytkownika w powiadomieniu systemowym.
Treść powiadomienia systemowego z informacją o zaproszeniu do objęcia roli
Ad. 3. Ostatnią możliwością odrzucenia roli interesariusza w danej CKOB jest wybór opcji Odrzucenie
roli, która jest dostępna w menu narzędziowym danej książki obiektu budowlanego.
Rejestr KOB – opcja odrzucenia roli
Po wybraniu tej opcji System wyświetli okno Odrzucenie przyjęcia roli interesariusza z informacją
o numerze książki obiektu budowlanego, nazwą obiektu budowlanego oraz rolą użytkownika w danej
CKOB. Użytkownik odrzuca objęcie roli klikając przycisk .
Rejestr KOB – odrzucenie przyjęcia roli
Odrzucenie zapisywane jest w bazie danych Systemu.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Właściciel/zarządca oraz osoba upoważniona do prowadzania danej CKOB są każdorazowo
informowani drogą mailową oraz poprzez powiadomienie systemowe o odrzuceniu roli przez
interesariusza w ramach danej CKOB.
Powiadomienie systemowe – odrzucenie roli
3.5.6.4 Rezygnuj z pełnionej roli
Funkcjonalność aplikacji dostępna dla użytkownika w roli: właściciel/zarządca*, osoba upoważniona do prowadzenia KOB,
osoba przeprowadzająca kontrole (* jeśli w książce istnieje inny interesariusz w roli właściciel/zarządca).
Opcja ta znajduje się w menu narzędziowym danej CKOB.
Rejestr KOB – opcja rezygnacji z pełnionej roli
Po wyborze pozycji Rezygnuj z pełnionej roli, System wyświetli użytkownikowi komunikat z pytaniem,
czy na pewno chce zrezygnować z pełnionej roli – aby potwierdzić decyzję należy kliknąć przycisk TAK.
Potwierdzenie rezygnacji z pełnionej roli
Po kliknięciu System automatycznie ustawia datę wygaśnięcia obowiązków użytkownika w kontekście
danej CKOB i tym samym blokuje dostęp do CKOB osobie, która rezygnuje z pełnionej roli. Wysyłane
jest również powiadomienie systemowe do WZ informujące o tym fakcie.

### Tabela:
| Funkcjonalność aplikacji dostępna dla użytkownika w roli: właściciel/zarządca*, osoba upoważniona do prowadzenia KOB, |
| --- |
| osoba przeprowadzająca kontrole (* jeśli w książce istnieje inny interesariusz w roli właściciel/zarządca). |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.5.6.5 Dostęp czasowy
Funkcjonalność aplikacji dostępna dla użytkownika w roli: właściciel/zarządca bądź osoba uprawniona do reprezentowania
właściciela/zarządcy, osoba upoważniona do prowadzenia KOB, przedstawiciel nadzoru budowlanego.
W celu ograniczenia czasowego dostępu do CKOB, należy z menu podręcznego danej CKOB wybrać
Interesariusze KOB, a następnie z narzędzi wybrać opcję Ustaw dostęp czasowy.
Rejestr interesariuszy KOB – wyświetlenie formularza konfiguracji dostępu czasowego do CKOB
W oknie Ustaw dostęp czasowy należy wskazać datę wygaśnięcia roli przy użyciu widżetu kalendarza.
Zastosowanie wskazanej daty ma miejsce po kliknięciu w przycisk OK, a następnie Zapisz.
Okno konfiguracji dostępu czasowego do CKOB
Ustawiona data wygaśnięcia roli w danej CKOB pojawi się w rejestrze interesariuszy oraz wysłana
zostanie wiadomość e-mail do interesariusza, którego zmiana dotyczy, z informacją o przydzieleniu
dostępu czasowego do CKOB.
Rejestr interesariuszy KOB po konfiguracji dostępu czasowego do CKOB

### Tabela:
| Funkcjonalność aplikacji dostępna dla użytkownika w roli: właściciel/zarządca bądź osoba uprawniona do reprezentowania |
| --- |
| właściciela/zarządcy, osoba upoważniona do prowadzenia KOB, przedstawiciel nadzoru budowlanego. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.5.6.6 Przedstawiciel organu administracji
Funkcjonalność aplikacji dostępna dla użytkownika w roli: właściciel/zarządca bądź osoba uprawniona do reprezentowania
właściciela/zarządcy, osoba upoważniona do prowadzenia KOB, przedstawiciel nadzoru budowlanego (posiadający
odpowiednie uprawnienie).
W celu udzielenia dostępu do CKOB przedstawicielowi organu administracji lub innych służb należy
w rejestrze interesariuszy KOB kliknąć przycisk .
Rejestr KOB – wywołanie formularza udzielenia dostępu do CKOB dla przedstawicieli organów administracji
W oknie Przedstawiciel organu administracji należy wskazać organ administracji, którego
przedstawicielem jest dodawany interesariusz, podać jego imię i nazwisko oraz adres e-mail,
a następnie zatwierdzić dane kliknięciem w przycisk Wyślij zaproszenie.
Formularz udzielenia dostępu do CKOB dla przedstawicieli organów administracji

### Tabela:
| Funkcjonalność aplikacji dostępna dla użytkownika w roli: właściciel/zarządca bądź osoba uprawniona do reprezentowania |
| --- |
| właściciela/zarządcy, osoba upoważniona do prowadzenia KOB, przedstawiciel nadzoru budowlanego (posiadający |
| odpowiednie uprawnienie). |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Potwierdzenie udzielenia dostępu do CKOB dla przedstawicieli organów administracji
Przedstawiciel organu otrzyma wiadomość e-mail oraz powiadomienie systemowe informujące
o udzieleniu dostępu do CKOB.
Powiadomienie systemowe informujące o udzieleniu dostępu do CKOB
Do momentu braku akceptacji zaproszenia użytkownik w rejestrze interesariuszy KOB oznaczony jest
kolorem czerwonym.
Rejestr KOB lista interesariuszy po udzielenia dostępu do CKOB dla przedstawicieli organów administracji
Metody przyjęcia funkcji przez przedstawiciela organów administracji są analogiczne jak w przypadku
interesariuszy co opisano w rozdziale Przyjęcie roli interesariusza.
3.5.7 Wpisy do Książki obiektu budowlanego
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
W celu wyświetlenia wpisów do książki obiektu budowlanego należy w menu narzędziowym książki
obiektu budowlanego kliknąć pozycję Wpisy.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Uwaga: Widoczność tej opcji w menu zależy od uprawnień użytkownika oraz od wykonania etapów poprzedzających
możliwość dodawania i przeglądania wpisów oraz przyjęcie obowiązków interesariusza.
Rejestr KOB – wyświetlenie rejestru wpisów
W oknie Wpisy książki obiektu budowlanego należy wybrać tablicę, w której chcemy przeglądać,
dodawać lub modyfikować wpisy. Lista tablic jest tożsama dla wszystkich interesariuszy danej CKOB,
ale narzędzia obsługi poszczególnych tablic zależą od roli (funkcji) jaką interesariusz pełni w danej
CKOB. Edycję wpisów w Tablicy III może wykonać wyłącznie osoba przeprowadzająca kontrolę.
Pozostałe Tablice mogą być w pełni obsługiwane przez właściciela/zarządcę oraz osobę upoważnioną
do prowadzania CKOB.
Wpisy książki obiektu budowlanego – lista tablic
3.5.7.1 Dodanie wpisu
Funkcjonalność aplikacji dostępna dla użytkownika w roli: właściciel/zarządca, osoba uprawniona do prowadzenia KOB*,
osoba przeprowadzająca kontrole* (*jeżeli została dodana do rejestru interesariuszy danej CKOB).
Dodanie wpisu wymaga kliknięcia przycisku , po czym wyświetlony zostanie panel
treści nowego wpisu.

### Tabela:
| Uwaga: Widoczność tej opcji w menu zależy od uprawnień użytkownika oraz od wykonania etapów poprzedzających |
| --- |
| możliwość dodawania i przeglądania wpisów oraz przyjęcie obowiązków interesariusza. |

### Tabela:
| Funkcjonalność aplikacji dostępna dla użytkownika w roli: właściciel/zarządca, osoba uprawniona do prowadzenia KOB*, |
| --- |
| osoba przeprowadzająca kontrole* (*jeżeli została dodana do rejestru interesariuszy danej CKOB). |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Dodanie wpisu do książki obiektu budowlanego
Każda z tablic ma indywidualny formularz obsługi wpisu. Po uzupełnieniu treści wpisu minimalnie
w zakresie wymaganym, należy go zapisać poprzez kliknięcie przycisku .
Dodatkowo do wpisu mogą zostać dołączone załączniki plikowe.
Dodanie wpisu do Tablicy VI
Każdy nowy wpis otrzymuje status aktualny. Użytkownik posiadający odpowiednie uprawnienia ma do
dyspozycji następujące narzędzia do obsługi wpisu:
• Podgląd wpisu;
• Korekta wpisu;
• Anulowanie wpisu.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Rejestr wpisów w Tablicy VI – widok dodanego wpisu
UWAGA! Wpisy w Tablicy III dodane 7 dni po zakończeniu kontroli mają datę wpisu oznaczoną na czerwono
Rejestr wpisów w Tablicy III – oznaczenie wpisu z kontroli wprowadzonego 7 dni po zakończeniu kontroli
3.5.7.2 Podgląd wpisu
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
Podgląd wpisu i jego załączników możliwy jest po wyborze z poziomu menu narzędziowego wpisu opcji
Pokaż wpis.
Rejestr wpisów w Tablicy VI – menu narzędziowe, opcja Pokaż wpis

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Podgląd wpisu
3.5.7.3 Korekta wpisu
Funkcjonalność aplikacji dostępna dla użytkownika w roli: właściciel/zarządca, osoba uprawniona do prowadzenia KOB*,
osoba przeprowadzająca kontrole* (*jeżeli została dodana do rejestru interesariuszy danej CKOB).
Interesariusz może korygować wyłącznie własne wpisy w statusie aktualny.
W tym celu w menu narzędziowym wpisu należy wybrać opcję Skoryguj wpis. W oknie Koryguj wpis
należy wprowadzić skorygowaną treść wpisu oraz fakultatywnie dołączyć załączniki.
UWAGA! Poprzednio dodane do wpisu załączniki nie są wiązane z nową treścią wpisu, dlatego też należy je ponownie
załączyć do korygowanego wpisu.
UWAGA! Korygować wpis można w okresie 30 dni od momentu dodania danego wpisu!
Uruchomienie korekty wpisu

### Tabela:
| Funkcjonalność aplikacji dostępna dla użytkownika w roli: właściciel/zarządca, osoba uprawniona do prowadzenia KOB*, |
| --- |
| osoba przeprowadzająca kontrole* (*jeżeli została dodana do rejestru interesariuszy danej CKOB). |

### Tabela:
| UWAGA! Poprzednio dodane do wpisu załączniki nie są wiązane z nową treścią wpisu, dlatego też należy je ponownie |
| --- |
| załączyć do korygowanego wpisu. |
| UWAGA! Korygować wpis można w okresie 30 dni od momentu dodania danego wpisu! |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Korekta wpisu
Po dokonaniu zapisu, status korygowanego wpisu zostaje zmieniony na anulowany i wpis jest
ukrywany w tabeli wpisów (domyślnie widoczne są wyłącznie aktualne wpisy). Aby wyświetlić
anulowane wpisy należy zmienić opcje filtrowania danych. Wpisy skorygowane są oznaczane w tabeli
wpisów kolorem czerwonym.
Rejestr wpisów z widocznymi wszystkimi wpisami
Skorygowaną treść wpisu można podglądnąć klikając opcję Pokaż wpis korygujący w menu
narzędziowym wpisu o statusie anulowany.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Wywołanie podglądu wpisu korygującego
Podgląd wpisu korygującego
W podglądzie wpisu anulowanego kolorem pomarańczowym oznaczone zostały zmiany treści wpisu
oraz znajduje się odnośnik do wpisu korygującego.
Podgląd wpisu anulowanego

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.5.7.4 Anulowanie wpisu
Funkcjonalność aplikacji dostępna dla użytkownika w roli: właściciel/zarządca, osoba uprawniona do prowadzenia KOB*,
osoba przeprowadzająca kontrole* (*jeżeli została dodana do rejestru interesariuszy danej CKOB).
Interesariusz może anulować wpis, ale wyłącznie w zakresie własnych, aktualnych wpisów. W tym celu
w menu narzędziowym wpisu należy wybrać opcję Oznacz wpis jako anulowany.
UWAGA! Anulować wpis można w okresie 30 dni od momentu dodania danego wpisu!
Menu narzędziowe wpisu – opcja anulowania wpisu
W oknie Anuluj wpis należy podać uzasadnienie anulowania wpisu:
Formularz anulowania wpisu
Po zapisie, status anulowanego wpisu zostaje zmieniony na anulowany oraz blokowany jest on do
modyfikacji. W podglądzie anulowanego wpisu znajduje się uzasadnienie jego anulowania.
Rejestr wpisów z widocznymi wpisami anulowanymi

### Tabela:
| Funkcjonalność aplikacji dostępna dla użytkownika w roli: właściciel/zarządca, osoba uprawniona do prowadzenia KOB*, |
| --- |
| osoba przeprowadzająca kontrole* (*jeżeli została dodana do rejestru interesariuszy danej CKOB). |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Podgląd anulowanego wpisu z uzasadnieniem anulowania wpisu
3.5.8 Zmiana statusu KOB
Funkcjonalność aplikacji dostępna dla użytkownika w roli: właściciel/zarządca bądź osoba uprawniona do reprezentowania
właściciela/zarządcy, osoba upoważniona do prowadzenia KOB.
W Systemie c-KOB książka może przyjąć jeden z kilku statusów. Zostały one opisane w poniższej tabeli:
Podmiot
Status książki
uprawniony
obiektu Opis
do nadania
budowlanego
statusu
Domyślny status nadawany automatycznie po założeniu cyfrowej książki obiektu
otwarta n/d
budowlanego
Status nadawany przez właściciela/zarządcę bądź osobę uprawnioną do reprezentowania
właściciela/zarządcy lub osoby upoważnionej do prowadzania książki obiektu budowlanego.
zamknięta WZ/UPK Status nadawany KOB powiązanym z obiektami już nieistniejącymi (np. zostały poddane
rozbiórce).
Status ten może zostać zwrotnie zmieniony na otwarta.
Status nadawany przez właściciela/zarządcę bądź osobę uprawnioną do reprezentowania
właściciela/zarządcy lub osoby upoważnionej do prowadzania książki obiektu budowlanego.
archiwalna –
Status nadawany KOB, które zostały nieprawidłowo założone w systemie (np. duplikat
błędnie WZ/UPK
KOB).Status ten nie powinien być nadawany KOB, w której znajdują się już wpisy z kontroli
założona
obiektu.
Status ten może zostać zwrotnie zmieniony na otwarta.
Status nadawany automatycznie po upływie 10 lat od zamknięcia książki obiektu
archiwalna n/d
budowlanego.
W celu zmiany statusu należy z menu narzędziowego danej CKOB wybrać opcję Zmień status KOB.

### Tabela:
| Funkcjonalność aplikacji dostępna dla użytkownika w roli: właściciel/zarządca bądź osoba uprawniona do reprezentowania |
| --- |
| właściciela/zarządcy, osoba upoważniona do prowadzenia KOB. |

### Tabela:
| Status książki obiektu budowlanego | Podmiot uprawniony do nadania statusu | Opis |  |  |
| --- | --- | --- | --- | --- |
| otwarta | n/d | Domyślny status nadawany automatycznie po założeniu cyfrowej książki obiektu budowlanego |  |  |
| zamknięta | WZ/UPK |  | Status nadawany przez właściciela/zarządcę bądź osobę uprawnioną do reprezentowania |  |
|  |  |  | właściciela/zarządcy lub osoby upoważnionej do prowadzania książki obiektu budowlanego. |  |
|  |  |  | Status nadawany KOB powiązanym z obiektami już nieistniejącymi (np. zostały poddane |  |
|  |  |  | rozbiórce). |  |
|  |  |  | Status ten może zostać zwrotnie zmieniony na otwarta. |  |
| archiwalna – błędnie założona | WZ/UPK |  | Status nadawany przez właściciela/zarządcę bądź osobę uprawnioną do reprezentowania |  |
|  |  |  | właściciela/zarządcy lub osoby upoważnionej do prowadzania książki obiektu budowlanego. |  |
|  |  |  | Status nadawany KOB, które zostały nieprawidłowo założone w systemie (np. duplikat |  |
|  |  |  | KOB).Status ten nie powinien być nadawany KOB, w której znajdują się już wpisy z kontroli |  |
|  |  |  | obiektu. |  |
|  |  |  | Status ten może zostać zwrotnie zmieniony na otwarta. |  |
| archiwalna | n/d | Status nadawany automatycznie po upływie 10 lat od zamknięcia książki obiektu budowlanego. |  |  |

### Tabela:
| archiwalna – |
| --- |
| błędnie |
| założona |

### Tabela:
| Status nadawany automatycznie po upływie 10 lat od zamknięcia książki obiektu |
| --- |
| budowlanego. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Uruchomienie okna zmiany statusu książki obiektu budowlanego
W wyświetlonym formularzu dostępna jest lista statusów książek obiektów budowlanych. Jej
zawartość zależy od uprawnień użytkownika, który dokonuje zmiany statusu oraz statusu książki
obiektu budowlanego sprzed dokonania zmiany.
W celu zmiany statusu należy wybrać nowy, docelowy status z dostępnej listy statusów, a następnie
wpisać uzasadnienie zmiany statusu, którego treść zostanie zamieszczona w książce jako wpis. Zmianę
statusu należy zatwierdzić poprzez kliknięcie przycisku Zapisz.
Zmiana statusu książki obiektu budowlanego
System poprosi użytkownika o potwierdzenie zmiany statusu – należy kliknąć przycisk TAK.
Potwierdzenie zmiany statusu

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Rejestr książek obiektów budowlanych po zmianie statusu książki obiektu budowlanego
W przypadku nadawania statusu archiwalna – błędnie założona książce, w której umieszone są wpisy
z przeprowadzonych kontroli, dodatkowo pojawi się komunikat z prośbą o weryfikację oraz
potwierdzenie konieczności zmiany statusu książki.
Potwierdzenie zmiany statusu książki z wpisami w tablicy nr III
3.5.9 Eksport zestawień do pliku
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
Rejestr KOB można zapisać do pliku w kilku formatach. Narzędzie do eksportu danych dostępne jest
pod przyciskiem . Po jego kliknięciu należy wskazać format pliku, w jakim chcemy
zapisać zestawienie książek. Do wyboru dostępne są następujące formaty: pdf, csv, xls.
Uwaga: Do pliku zapisywane są wyłącznie aktualnie widoczne w rejestrze książki obiektu budowlanego. Jeśli Rejestr KOB
ma aktywny filtr danych to w celu wygenerowania pełnego rejestru KOB należy ten filtr wyczyścić.
Eksport rejestru KOB

### Tabela:
| Uwaga: Do pliku zapisywane są wyłącznie aktualnie widoczne w rejestrze książki obiektu budowlanego. Jeśli Rejestr KOB |
| --- |
| ma aktywny filtr danych to w celu wygenerowania pełnego rejestru KOB należy ten filtr wyczyścić. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Wyeksportowany rejestr książek obiektów budowlanych zgodny z ustawionym filtrowaniem danych
3.5.10 Eksport KOB do pliku PDF
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
Eksport książki obiektu budowlanego do pliku PDF jest możliwy z poziomu menu narzędziowego książki
w rejestrze KOB.
Uruchomienie eksportu CKOB do pliku PDF
Książka obiektu budowlanego domyślnie eksportowana jest w wersji pełnej, czyli zawiera aktualne
wpisy ze wszystkich tablic.
Okno eksportu KOB do pliku PDF – domyślne parametry eksportu

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Zawartość eksportowanego pliku można określić zmieniając parametry eksportu. Generowanie pliku
rozpoczyna się po kliknięciu przycisku Zapisz.
Okno eksportu KOB do pliku PDF – konfiguracja parametrów eksportu
KOB w formacie PDF – widok strony tytułowej

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Uwaga: Eksport KOB do pliku PDF w obu wersjach jest domyślnie dostępny dla interesariuszy oraz przedstawicieli organów
administracji i innych służb.
3.5.11 Weryfikacja sumy kontrolnej
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
W celu sprawdzenia czy dokument PDF z KOB został wygenerowany przez System c-KOB i jego treść
nie podlegała modyfikacji, należy wykonać weryfikację sumy kontrolnej dokumentu. Służy do tego
narzędzie Weryfikacja sumy kontrolnej znajdujące się w menu narzędziowym CKOB.
Uruchomienie narzędzia Weryfikacja sumy kontrolnej
W oknie weryfikacji sumy kontrolnej należy w polu Nazwa pliku wskazać plik PDF z KOB, która ma
zostać walidowana, a następie kliknąć przycisk .
Okno Weryfikacja sumy kontrolnej
System dokona weryfikacji sumy kontrolnej wskazanego danego dokumentu z sumą zapisaną w bazie
c-KOB. Po zakończeniu weryfikacji jej wynik wyświetlany zostanie w oknie informacyjnym.

### Tabela:
| Uwaga: Eksport KOB do pliku PDF w obu wersjach jest domyślnie dostępny dla interesariuszy oraz przedstawicieli organów |
| --- |
| administracji i innych służb. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Okno z pozytywnym wynikiem weryfikacji sumy kontrolnej
Okno z negatywnym wynikiem weryfikacji sumy kontrolnej
3.6 Profil użytkownika
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
W menu Profil użytkownika znajdują się informacje dotyczące aktualnie zalogowanego do Systemu
użytkownika zapisane w ramach jego profilu w Systemie c-KOB.
3.6.1 Powiadomienia
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
W module Powiadomienia zgromadzone są wiadomości z Systemu c-KOB informujące użytkownika
o istotnych etapach obsługi książki obiektu budowlanego oraz powiadomienia techniczne (dotyczące
np. aktualizacji Systemu lub przerw technicznych).

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Okno powiadomień systemowych
Nowe powiadomienia oraz te dotychczas nieprzeczytane przez użytkownika, oznaczone są
pogrubieniem czcionki. Aby je wyświetlić należy kliknąć ikonę . Po przeczytaniu wiadomości jest ona
oznaczana jako przeczytana, a w Systemie zapisywana jest data jej odebrania.
Okno podglądu treści powiadomienia
Nowe wiadomości sygnalizowane są ikoną , obok której wyświetlana jest liczba nowych
powiadomień. Kliknięcie ikony powoduje wyświetlenie okna z rejestrem powiadomień. W rejestrze
domyślnie wyświetlane są wiadomości nieprzeczytane, posortowane malejąco według daty i godziny
przesłania wiadomości.

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Sygnalizacja nowych wiadomości oraz przejście do ich podglądu
Powiadomienia można przeglądać i wyszukiwać używając narzędzi filtrowania. W celu filtrowania
danych należy kliknąć w tytuł panelu Filtrowanie. Następnie należy wpisać wyszukiwaną frazę lub
zaznaczyć dostępne opcje filtrowania, a następnie kliknąć przycisk .
Filtrowanie powiadomień
3.6.1.1 Powiadomienia WebPush
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
W Systemie c-KOB funkcjonują także powiadomienia typu WebPush i są one dedykowane urządzeniom
mobilnym. Aktywowanie powiadomień WebPush wymaga kliknięcia ikony , znajdującej się pod

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
tabelą powiadomień. Aktywność wiadomości WebPush oznaczona jest zmianą koloru wspomnianej
ikony na kolor zielony.
Profil użytkownika – powiadomienia WebPush
Profil użytkownika – powiadomienia WebPush włączone
3.6.2 Dane użytkownika
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
Okno Dane użytkownika zawiera zestaw szczegółowych informacji na temat użytkownika Systemu
c-KOB. Część informacji zawartych w tej sekcji jest zapisywanych podczas rejestracji konta, jednak
po tym procesie należy uzupełnić pozostałe wymagane informacje dotyczące użytkownika,
w szczególności dane teleadresowe oraz informacje o uprawnieniach zawodowych (szczególnie ważne
dla interesariuszy KOB).

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.6.2.1 Informacje podstawowe
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
W sekcji Informacje podstawowe znajdują się dane użytkownika dotyczące konta użytkownika:
• Nazwa użytkownika – to adres e-mail;
• Typ podmiotu – wskazywany przy rejestracji konta użytkownika;
• Nadrzędna rola użytkowania – informacja o głównej roli użytkownika w Systemie
(interesariusz lub przedstawiciel organu administracji);
• Sposób logowania do Systemu c-KOB – możliwe opcje to logowanie przez System c-KOB
i logowanie przez Węzeł Krajowy.
• Data utworzenia konta;
• Data aktywacji konta;
• Informacja czy konto jest zablokowane;
Dane użytkownika – sekcja Informacje podstawowego
Uwaga: Modyfikacja informacji o użytkowniku zawartych w sekcji Dane użytkownika w ograniczonym zakresie jest możliwa
do wykonania przez osoby posiadające uprawnienia do modyfikacji kont użytkowników Systemu c-KOB (administratorów
Systemu).
W sekcji informacji podstawowych znajduje się przycisk do zmiany hasła . Procedura
zmiany hasła została opisana poniżej.
3.6.2.2 Dane kontaktowe
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
W sekcji Dane kontaktowe znajdują się dane teleadresowe użytkownika:
• Numery telefonów;
• Adres skrzynki ePUAP;

### Tabela:
| Uwaga: Modyfikacja informacji o użytkowniku zawartych w sekcji Dane użytkownika w ograniczonym zakresie jest możliwa |
| --- |
| do wykonania przez osoby posiadające uprawnienia do modyfikacji kont użytkowników Systemu c-KOB (administratorów |
| Systemu). |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
• Adres zamieszkania lub siedziby;
• Opcja wprowadzenia adresu do korespondencji w przypadku, jeśli jest inny niż adres
zamieszkana/siedziby.
Dane użytkownika – sekcja Dane kontaktowe, Adres zamieszkania/siedziby
Użytkownik może edytować dane w tej sekcji.
3.6.2.3 Regulaminy i zgody
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
W sekcji Regulaminy i zgody znajduje się zestawienie regulaminów i zgód funkcjonujących w Systemie
wraz ze wskazaniem na aktualny stan ich akceptacji przez użytkownika.
Dane użytkownika – sekcja Regulaminy i zgody
Uwaga: Użytkownik może modyfikować akceptacje regulaminów/zgód tylko w zakresie tych pozycji, które nie mają statusu
obligatoryjnych do akceptacji.

### Tabela:
| Uwaga: Użytkownik może modyfikować akceptacje regulaminów/zgód tylko w zakresie tych pozycji, które nie mają statusu |
| --- |
| obligatoryjnych do akceptacji. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.6.2.4 Uprawnienia zawodowe
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
Użytkownik Systemu c-KOB może wskazać jakie uprawnienia zawodowe posiada. Jest to istotne
w szczególności w przypadku osób przeprowadzających kontrole obiektu. Uzupełnienie tych informacji
nie jest wymagane, a ich brak nie blokuje możliwości obsługi Systemu.
Uwaga: Użytkownik pełniący funkcję Osoby przeprowadzającej kontrole w kontekście co najmniej jednej KOB musi
wprowadzić dane dotyczące posiadanych uprawnień do przeprowadzania kontroli, o których mowa w art. 62 ust. 1 Prawa
Budowlanego.
W celu dodania uprawnień zawodowych ręcznie należy kliknąć ikonę , następnie uzupełnić
formularz oraz dodać dokumenty potwierdzające posiadanie uprawnień.
Definiowanie uprawnień zawodowych
Wprowadzone dane należy zapisać klikając przycisk . Po zapisaniu danych w formularzu, obok
nazwy skanu uprawnień pojawi się dodatkowa ikona , umożliwiająca pobranie dołączonych
dokumentów na dysk komputera.
Możliwe jest dodanie większej liczby uprawnień – wówczas każdorazowo należy kliknąć ikonę .
Usunięcie uprawnienia jest możliwe poprzez kliknięcie w przycisk .
Uprawnienia zawodowe można również zaimportować z Systemu eCRUB. W tym celu należy kliknąć
przycisk , następnie podać numer PESEL użytkownika i potwierdzić go klikając
.

### Tabela:
| Uwaga: Użytkownik pełniący funkcję Osoby przeprowadzającej kontrole w kontekście co najmniej jednej KOB musi |
| --- |
| wprowadzić dane dotyczące posiadanych uprawnień do przeprowadzania kontroli, o których mowa w art. 62 ust. 1 Prawa |
| Budowlanego. |

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
Formularz importu uprawnień zawodowych z Sytemu eCRUB
Uprawnienia zawodowe pobrane z Sytemu eCRUB
Aby uprawnienia mogły zostać zapisane należy dodać dokument potwierdzający posiadanie danych
kwalifikacji zawodowych. W tym celu należy kliknąć przycisk i wskazać z dysku
komputera odpowiedni plik. Po załadowaniu się pliku będzie on widoczny pod wprowadzonym
uprawnieniem.
Dokument potwierdzający posiadanie uprawnień
Aby zmienić przesłany plik należy kliknąć ikonę i ponownie klikając przycisk wskazać
z dysku komputera właściwy plik.
Wprowadzone dane należy zapisać klikając przycisk .

Projekt: Zaprojektowanie, budowa i wdrożenie w infrastrukturze wskazanej przez
Zamawiającego systemu teleinformatycznego cyfrowej książki obiektu
budowlanego [System c-KOB]
3.6.2.5 Zmiana hasła
Funkcjonalność aplikacji dostępna dla użytkowników Systemu c-KOB w dowolnej roli.
W celu zmiany hasła konta użytkownika należy kliknąć przycisk Zmień hasło.
Uruchomienie zmiany hasła do konta użytkownika
Na formularzu zmiany hasła należy wpisać i potwierdzić nowe hasło, następnie kliknąć przycisk Zmień.
Formularz zmiany hasła

---
<!-- SOURCE: Materiały szkoleniowe 31032026.pdf -->
## Źródło: Materiały szkoleniowe 31032026.pdf

Elektroniczna Książka Obiektu Budowlanego
w praktyce
Data: 31.03.2026 r. Wykładowca: Pan Michał Substyk

### Tabela:
|  |  |  |
| --- | --- | --- |
|  | Elektroniczna Książka Obiektu Budowlanego w praktyce |  |
|  | Data: 31.03.2026 r. Wykładowca: Pan Michał Substyk |  |
|  |  |  |
|  |  |  |

### Tabela:
| Elektroniczna Książka Obiektu Budowlanego w praktyce |  |
| --- | --- |
|  |  |
| Data: 31.03.2026 r. | Wykładowca: Pan Michał Substyk |

CCyyffrroowwaa KKssiiąążżkkaa OObbiieekkttuu BBuuddoowwllaanneeggoo
ww pprraakkttyyccee
MMiicchhaałł SSuubbssttyykk 3311 mmaarrccaa 22002266
30.03.26

### Tabela:
| CCyyffrroowwaa KKssiiąążżkkaa OObbiieekkttuu BBuuddoowwllaanneeggoo ww pprraakkttyyccee |  |
| --- | --- |
|  |  |
| MMiicchhaałł SSuubbssttyykk 3311 mmaarrccaa 22002266 30.03.26 |  |

### Tabela:
|  |  |
| --- | --- |
|  |  |

### Tabela:
|  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |
|  |  |  |  | aa KKssiiąąż |  | żkkaa OObbiieekkttuu BBuuddoo |  |  |  |
|  | CCyyffrrooww | CCyyffrrooww |  |  |  |  |  | nneeggoo |  |
|  |  |  |  |  |  |  |  |  |  |

### Tabela:
| pprraakkttyyccee |
| --- |
|  |

(art. 6 ustawy z 7.07.2022 o zmianie PB
ZZmmiiaannyy ww pprrzzeeppiissaacchh
+ art. 6 ustawy z 4.12.2025 o zmianie PB)
► od 11 ssttyycczznniiaa 22002233 można już zakładać nową cyfrowa książkę obiektu budowlanego,
► od 11 ssttyycczznniiaa 22002244 dla nowych obiektów można zakładać tylko i wyłącznie nową
cyfrową książkę obiektu budowlanego,
► nie wolno prowadzić równolegle starej „papierowej” książki i nowej cyfrowej (c-KOB),
► nie wolno „mieszać” przepisów dotyczących „starej” papierowej KOB i przepisów
dotyczących „nowej” c-KOB – do książek „papierowych” stosujemy tylko i wyłącznie
„stare” przepisy, a do c-KOB wyłącznie nowe przepisy,
► na c-KOB można przejść w każdej chwili, kiedy uznamy, że wygodniej nam korzystać
z narzędzi cyfrowych niż z formularza papierowego,
► do dnia 3311 ggrruuddnniiaa 22003311 rr. musi być założona książka obiektu budowlanego w systemie
Cyfrowa Książka Obiektu Budowlanego.
CCyyffrroowwaa ((eelleekkttrroonniicczznnaa)) kkssiiąążżkkaa oobbiieekkttuu bbuuddoowwllaanneeggoo
((cc--KKOOBB))
cczzyyllii nnoowwee pprrzzeeppiissyy ddoottyycczząąccee pprroowwaaddzzeenniiaa KKOOBB
ww uussttaawwiiee PPrraawwoo bbuuddoowwllaannee
RRoozzddzziiaałł 55dd „„KKssiiąążżkkaa oobbiieekkttuu bbuuddoowwllaanneeggoo””
IInntteerreessaarriiuusszzee
IInntteerreessaarriiuusszz, jest to osoba fizyczna, która ma prawo i możliwość pracy w systemie
teleinformatycznym c-KOB.
W systemie c-KOB jest trzech interesariuszy:
właściciel/zarządca lub osoba fizyczna uprawniona do ich reprezentowania (WZ),
●
osoba uprawniona do prowadzenia książki (UPK),
●
osoba prowadząca okresowe kontrole (OPK).
●
Interesariusz musi założyć sobie konto w systemie c-KOB.
Tylko interesariusze mają dostęp do c-KOB.
Osoby nie będące interesariuszami mogą tylko dostać wydruk KOB w formacie PDF.
IInntteerreessaarriiuusszzee,, cczzyyllii ddeelleeggoowwaanniiee uupprraawwnniieeńń ddoo zzaakkłłaaddaanniiaa
ii pprroowwaaddzzeenniiaa cc--KKOOBB oorraazz ddookkoonnyywwaanniiaa wwppiissóóww zz kkoonnttrroollii
Kierownictwo najwyższego szczebla,
faktyczny właściciel/zarządca
uprawnienie
uprawnienie
Właściciel/zarządca (funkcja)
Właściciel/zarządca (funkcja)
(WZ)
Właściciel/zarz(ąWdZc)a (funkcja)
(WZ)
udostępnienie
udostępnienie
Uprawniony prowadzący książkę
Uprawniony prowadzący książkę
(UPK) lub (WZ) lub (WZ+UPK)
Upra(UwPnKio) nluyb p (rWowZa) dluzbą c(yW kZs+iąUżPkKę)
(UPK) lub (WZ) lub (WZ+UPK)
udostępnienie
Osoby prowadzące kontrole
Osoby prowadzące kontrole
(OPK)
Osoby prowad(OząPcKe) kontrole
(OPK)

### Tabela:
|  |  |
| --- | --- |
|  |  |
| udostę |  |
|  |  |

ZZaałłoożżeenniiee kkoonnttaa ww ssyysstteemmiiee cc--KKOOBB
W celu pracy z książką obiektu
budowlanego w postaci elektronicznej
właściciel, zarządca, osoba prowadząca
Konto w systemie c-KOB zakłada się
książkę, osoba prowadząca kontrole, czyli
poprzez uwierzytelnienie się za
interesariusze, są obowiązani posiadać
pośrednictwem węzła krajowego
konto w systemie c-KOB.
(login.gov.pl).
Węzeł Krajowy (Krajowy Węzeł Identyfikacji
Elektronicznej) to ppaańńssttwwoowwyy centralny system,
który umożliwia obywatelom dostęp do usług
publicznych online. Działa jako pośrednik,
pozwalając na uwierzytelnianie się w różnych
systemach i usługach za pomocą różnych
ppaańńssttwwoowwyycchh środków identyfikacji
elektronicznej, np. profilu zaufanego, aplikacji
mObywatel, e-dowodu czy też indywidualnej
bankowości elektronicznej.

### Tabela:
|  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |

CCeelleemm zzaałłoożżeenniiaa kkoonnttaa ww ssyysstteemmiiee cc--KKOOBB nnaalleeżżyy::
Po założeniu konta jest możliwa
zmiana ee--mmaaiillaa, ale w tym celu
Uwierzytelnić się poprzez węzeł
konieczny jest kontakt z 
krajowy, oraz
Podać przy zakładaniu konta
Nie można założyć sobie kilku
ee--mmaaiill, który będzie
kont w systemie c-KOB
identyfikatorem/loginem do
systemu c-KOB
Osoba, która założyła konto
w systemie c-KOB, staje się
Z poziomu użytkownika nie ma
wyłącznym użytkownikiem tego
możliwości zmiany tego
konta, a system c-KOB
ee--mmaaiillaa zabezpiecza konto przed
dostępem osób trzecich
KKssiiąążżkkęę mmoożżee zzaałłoożżyyćć wwyyłłąącczznniiee oossoobbaa oo ssttaattuussiiee WWZZ
tytuł prawny, z którego wynika
Przy zakładaniu książki obiektu
uprawnienie do reprezentowania
budowlanego w postaci
właściciela lub zarządcy obiektu
elektronicznej wprowadza się do
budowlanego – w przypadku osoby
systemu c-KOB następujące dane
fizycznej działającej w imieniu
dotyczące właściciela lub zarządcy właściciela lub zarządcy
obiektu budowlanego, oraz dane
dokument, z którego wynika tytuł
dotyczące osoby fizycznej
prawny właściciela lub zarządcy
działającej w imieniu właściciela
do obiektu budowlanego
lub zarządcy obiektu
budowlanego, (jeżeli występuje):
dane dotyczące obiektu budowlanego
Art. 60d. Właściciel lub zarządca obiektu budowlanego
wskazuje w książce obiektu budowlanego osobę fizyczną do
prowadzenia tej książki. Za prowadzenie książki obiektu
budowlanego odpowiada wskazana w tej książce osoba
fizyczna.
Interpretacja tego przepisu już od momentu opiniowania projektu
zmian w ustawie Prawo budowlane budziła wątpliwości.
Po wejściu w życie nowych przepisów wątpliwości te jeszcze
bardziej się nasiliły ⇒ vide następny slajd
SSttaannoowwiisskkoo GGUUNNBB - istota regulacji sprowadza się do tego, aby była wyraźnie wskazana osoba fizyczna,
która jest odpowiedzialna za (prawidłowe) prowadzenia książki obiektu budowlanego. Nie ma przeszkód
by do jednej książki miało dostęp wiele osób w funkcji właściciel lub zarządca, ale osoba upoważniona do
prowadzenia książki może być tylko jedna.
KKoommeennttaarrzz RRzząąddoowweeggoo CCeennttrruumm LLeeggiissllaaccjjii – Powyższa regulacja nie realizuje tego celu.
ZZaassaaddyy lleeggiissllaaccjjii - w warstwie językowej przepisu prawa jest użycie rzeczowników co do zasady, w liczbie
pojedynczej. Zasada ta nie powoduje ograniczenia stosowania wymogów do wybranego, jednego
elementu, gdy jest ich więcej.
WWnniioosskkii pprraakkttyycczznnee - w przypadku wskazania kilku osób do prowadzenia książki, należy określić odrębny zakres
odpowiedzialności każdej z nich. Za prowadzenie KOB będzie odpowiadać każda z nich w swoim zakresie.
RReekkoommeennddaaccjjaa – zasięgniecie opinii prawnej u swojego radcy prawnego.

### Tabela:
| ZZaassaaddyy lleeggiissllaaccjjii |  |  |
| --- | --- | --- |
|  |  |  |
|  |  |  |
| pojedyn |  | czej. |
|  |  |  |
| elemen | t | u, |
|  |  |  |
|  |  |  |
|  |  |  |
| WWnniioosskkii | pp | rraakkttyycczznnee |
|  |  |  |
| odpowie |  | dzialności |

Osoby wskazane do prowadzenia książki (UUPPKK) muszą mieć konto w systemie
c-KOB i być wskazani przez WWZZ w systemie c-KOB do prowadzenia książki.
WWZZ może to samo co UUPPKK,
Interesariusza o statusie OOPPKK
natomiast UUPPKK może to samo co
może wskazać zarówno WWZZ jak
WWZZ z wyłączeniem:
i UUPPKK
zakładania książek,
►
przekazywania książek,
►
Osoby o statusie WWZZ i UUPPKK nie
zapraszania jako
► mogą jedynie dokonywać
interesariusza kolejnego
wpisów do tablicy z wynikami
UUPPKK czy WWZZ
okresowych kontroli (rocznych,
półrocznych, pięcioletnich).
Osoby prowadzące kontrole (budowlańcy, gazownicy, kominiarze i elektrycy -
OOPPKK) po założeniu konta c-KOB muszą wprowadzić swoje uprawnienia, tj.:
poprzez e-CRUB OOPPKK jaki i pozostali
►
interesariusze (WWZZ i UUPPKK ) może
lub wprowadzić do systemu
► zapoznać się z treścią i wpisami
swój numer uprawnień
do całej książki.
budowlanych lub decyzji
o nadaniu uprawnień albo
innych dokumentów
Ale tylko i wyłącznie OOPPKK może
dających podstawę do
dokonywać wpisów do tablicy
dokonywania kontroli.
z wynikami okresowych kontroli
(rocznych, półrocznych,
pięcioletnich).
UUWWAAGGAA ww pprrzzyyppaaddkkuu pprroowwaaddzzeenniiaa kkoonnttrroollii ookkrreessoowweejj
pprrzzeezz kkiillkkaa oossóóbb!!!!!!
Oznacza to, że każda z osób, która
W przypadku, ggddyy kkoonnttrroollaa jjeesstt
przeprowadza kontrolę okresową,
pprrzzeepprroowwaaddzzaannaa pprrzzeezz kkiillkkaa oossóóbb,,
powinna zostać dodana jako
kkaażżddaa zz oossóóbb, która przeprowadziła
interesariusz c-KOB i mieć możliwość
kontrolę, dokonuje wpisu w książce
dokonania wpisu w tablicy
prowadzonej w postaci elektronicznej
z wynikami okresowych kontroli
w systemie c-KOB w zakresie
(rocznych, półrocznych,
przeprowadzonej przez siebie
pięcioletnich), odpowiednio do
kontroli, a nie jedna z nich w zakresie
zakresu przeprowadzonej przez
wszystkich kontroli.
siebie kontroli i w granicach
posiadanych uprawień budowlanych
(czy też innych kwalifikacji).
PPrroocceess zzaakkłłaaddaanniiaa cc--KKOOBB ii nnaaddaawwaanniiaa uupprraawwnniieeńń::
11 33
Kierownik jednostki (firmy, urzędu
Osoba ta (WZ) zakłada książkę w
itp.) lub zlecający, który nie musi
systemie c-KOB. Zakładając książkę
mieć konta w systemie c-KOB,
musi zdecydować, czy sama ją będzie
wyznacza osobę do zakładania
prowadzić i wówczas system nada jej
i prowadzenia c-KOB (osoba
równoległą rolę UPK, czy też wskaże
uprawniona do reprezentowania
inną osobę do prowadzania książki.
właściciela/zarządcy obiektu
System przekieruje ją wówczas do
budowlanego).
strony z dodawaniem interesariuszy.
22
Osoba uprawniona do
reprezentowania
właściciela/zarządcy obiektu
budowlanego zakłada sobie konto
c-KOB. Po założeniu konta, system
automatycznie nadaje jej rolę WZ.
Art. 60a. Książka obiektu budowlanego jest dokumentem przeznaczonym do dokonywania wpisów
w zakresie:
1) informacji o obiekcie budowlanym;
WWZZ
2) imienia i nazwiska albo nazwy, adresu zamieszkania lub siedziby oraz e-maila właściciela
lub zarządcy;
OOPPKK 3) kontroli, o których mowa w art. 62 ust. 1;
4) ekspertyz i opinii technicznych dotyczących obiektu budowlanego oraz imion i nazwisk osób,
przez które zostały sporządzone;
5) przeglądów technicznych, konserwacji oraz napraw urządzeń przeciwpożarowych oraz imion
i nazwisk osób, które dokonały tych czynności;
UUPPKK
6) robót budowlanych związanych z obiektem budowlanym, a wykonywanych po oddaniu do
użytkowania;
7) katastrof budowlanych dotyczących obiektu budowlanego;
8) decyzji, postanowień, zaświadczeń i innych dokumentów wydanych przez organy administracji
publicznej, dotyczących obiektu budowlanego.

### Tabela:
| Art. 60a. |
| --- |
| w zakresie: |

### Tabela:
|  | Art. |
| --- | --- |

Art. 60b. 1. Książkę obiektu budowlanego prowadzi się na bieżąco dla każdego:
budynku oraz
►
obiektu budowlanego niebędącego budynkiem, którego projekt jest objęty obowiązkiem
►
sprawdzenia, o którym mowa w art. 20 ust. 2.
2. Obowiązek prowadzenia książki obiektu budowlanego nie obejmuje:
1) bbuuddyynnkkóóww:
►
a) mieszkalnych jednorodzinnych,
●
b) garażowych i gospodarczych w zabudowie jednorodzinnej;
●
2) oobbiieekkttóóww bbuuddoowwllaannyycchh: Praca domowa: zapoznać
►
się z obiektami
wymienionymi w tym
a) budownictwa zagrodowego i letniskowego,
●
artykule.
b) wymienionych w art. 29 ust. 1 i 2, z wyłączeniem sieci gazowych, oraz wolno stojących,
●
nie więcej niż dwukondygnacyjnych budynków użyteczności publicznej o powierzchni
użytkowej nie większej niż 200 m2
3) dróg lub obiektów mostowych, dla których jest prowadzona książka drogi lub książka obiektu
mostowego na podstawie przepisów o drogach publicznych.

### Tabela:
|  |  |
| --- | --- |

### Tabela:
|  |  |
| --- | --- |

Art. 60c. Książkę obiektu budowlanego zakłada właściciel lub
zarządca obiektu budowlanego w terminie 30 dni od dnia:
doręczenia decyzji o pozwoleniu dokonania skutecznego dokonania zmiany sposobu
zawiadomienia o zakończeniu użytkowania obiektu budowlanego lub
na użytkowanie – w przypadku
jego części – jeżeli w wyniku tej zmiany
budowy – w przypadku obiektu
obiektu budowlanego, do
obiekt budowlany niewymagający
budowlanego, do użytkowania
którego użytkowania jest
wcześniej założenia książki obiektu
którego jest wymagane
wymagana decyzja o pozwoleniu budowlanego stał się obiektem
zawiadomienie o zakończeniu
budowlanym, dla którego należy
na użytkowanie;
budowy;
prowadzić książkę obiektu
budowlanego.

### Tabela:
| Art. 60c. Książkę obiektu budowlanego zakłada właściciel lub zarządca obiektu budowlanego w terminie 30 dni od dnia: doręczenia decyzji o pozwoleniu dokonania skutecznego dokonania zmiany sposobu zawiadomienia o zakończeniu użytkowania obiektu budowlanego lub na użytkowanie – w przypadku jego części – jeżeli w wyniku tej zmiany budowy – w przypadku obiektu obiektu budowlanego, do obiekt budowlany niewymagający budowlanego, do użytkowania którego użytkowania jest wcześniej założenia książki obiektu którego jest wymagane wymagana decyzja o pozwoleniu budowlanego stał się obiektem zawiadomienie o zakończeniu budowlanym, dla którego należy na użytkowanie; budowy; prowadzić książkę obiektu budowlanego. |  |  |  |  |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

### Tabela:
|  |  |  |  |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |

### Tabela:
|  |  |  |  |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |

### Tabela:
|  |  |  |  |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |

### Tabela:
|  |  |  |  |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |

### Tabela:
|  |  |  |  |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |

### Tabela:
|  |  |  |  |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |

### Tabela:
|  |  |  |  |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |

### Tabela:
|  |  |  |  |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |

### Tabela:
|  |  |  |  |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |

### Tabela:
|  |  |  |  |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |

### Tabela:
|  |  |  |  |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

### Tabela:
|  |  |  |  |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |

### Tabela:
|  |  |  |  |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |

Art. 60f. 1. Wpisu w książce obiektu budowlanego dokonuje się
niezwłocznie, jednak nie później niż w terminie 7 dni od dnia zaistnienia
okoliczności, której wpis dotyczy.
Osoba wskazana do prowadzenia KOB ma 7 dni na dokonanie wpisu od
dnia otrzymania informacji/ dokumentacji – czyli od dnia powzięcia do
wiadomości lub od dnia kiedy mogła podjąć do wiadomości o danym
zdarzeniu, które trzeba wpisać do KOB.
Art. 60g. W terminie miesiąca od dnia zakończenia rozbiórki obiektu
budowlanego jego właściciel lub zarządca zamyka prowadzoną w systemie
c-KOB książkę obiektu budowlanego.
●
Art. 60h. 1. Książkę obiektu budowlanego zakłada się i prowadzi w postaci
elektronicznej w systemie c-KOB.
2. Przepisu ust. 1 nie stosuje się do obiektów budowlanych usytuowanych
w całości lub w części nnaa tteerreennaacchh zzaammkknniięęttyycchh. Dla tych obiektów budowlanych
książkę obiektu budowlanego prowadzi się w postaci papierowej.
ppaappiieerroowweejj pprroowwaaddzzoonneejj nnaa nnoowwyycchh zzaassaaddaacchh,, ooppiissaannyycchh ww nnoowwyymm
rroozzppoorrzząąddzzeenniiuu
5. Każdej książce obiektu budowlanego prowadzonej w postaci elektronicznej
nadaje się w systemie c-KOB indywidualny numer.
●
EEddyyttoowwaanniiee,, kkoorryyggoowwaanniiee ii aannuulloowwaanniiee wwppiissóóww
6. System c-KOB zawiera zabezpieczenia uniemożliwiające usunięcie oraz zmianę
wprowadzonych danych.
7. Aktualizacji danych lub korekt wprowadzonych wpisów mogą dokonywać
podmioty wymienione w art. 60e ust. 1 w zakresie dokonanych przez siebie wpisów.
Dane w tablicach Nr 1 i 2 musi w razie potrzeby edytować i korygować
●
każdoczesny WZ lub UPK
●
Wpisy w tablicach 3, 4, 5, 6, 7 i 8 może edytować, korygować i anulować ttyyllkkoo
ii wwyyłłąącczznniiee aauuttoorr wpisu, nikt inny!
!!
UUWWAAGGAA – osobom o statusie OPK system pozwala na korektę wpisów tylko ww cciiąągguu
3300 ddnnii oodd ddookkoonnaanniiaa wwppiissuu.
8. System c-KOB zapewnia rozliczalność wprowadzonych danych i dokonanych
wpisów oraz dostępność tych danych i wpisów.
●
9. W trakcie zakładania książki obiektu budowlanego w systemie
c-KOB system ten weryfikuje, czy istnieje w nim książka obiektu
budowlanego dla obiektu budowlanego o wskazanej lokalizacji.
●
Art. 60k. 1. Osoba wskazana w książce obiektu budowlanego do jej prowadzenia
zapewnia dołączenie do książki obiektu budowlanego ppllaannuu ssyyttuuaaccyyjjnneeggoo, który
zawiera:
zaznaczone granice nieruchomości,
określenie przebiegu istniejących
na której jest usytuowany obiekt
dróg pożarowych
budowlany, a w przypadku sieci –
oznaczenie jej lokalizacji w terenie
określenie miejsc usytuowania
istniejących hydrantów zewnętrznych
lub innych punktów poboru wody do
określenie istniejących miejsc
celów przeciwpożarowych oraz
przyłączenia obiektu budowlanego do
stanowisk czerpania wody
sieci uzbrojenia terenu
w przypadku usytuowania urządzeń
przeznaczonych do odcinania
określenie istniejących miejsc
instalacji od przyłączy wewnątrz
usytuowania urządzeń
obiektu budowlanego do książki
przeznaczonych do odcinania
obiektu budowlanego dołącza się opis
instalacji od przyłączy oraz przyłączy
pozwalający na zlokalizowanie tych
od sieci
urządzeń
Art. 60i. 1. WW pprrzzyyppaaddkkuu zzmmiiaannyy wwłłaaśścciicciieellaa lluubb zzaarrzząąddccyy obiektu
budowlanego dotychczasowy właściciel lub zarządca obiektu budowlanego
przekazuje nowemu właścicielowi lub zarządcy tego obiektu książkę
obiektu budowlanego.
3. W przypadku nieprzekazania książki obiektu budowlanego prowadzonej
w postaci elektronicznej przez dotychczasowego właściciela lub zarządcę
obiektu budowlanego Główny Inspektor Nadzoru Budowlanego na wniosek
nowego właściciela lub zarządcy przekazuje im do dalszego prowadzenia
tę książkę w systemie c-KOB. Przekazanie, o którym mowa w zdaniu
pierwszym, następuje po przedstawieniu przez nowego właściciela lub
zarządcę dokumentów potwierdzających prawo właściciela lub zarządcy do
obiektu budowlanego.
●
UUddzziieellaanniiee ddoossttęęppuu ddoo cc--KKOOBB
oossoobboomm wwyykkoonnuujjąąccyymm ookkrreessoowwee kkoonnttrroollee
Art. 60m. Właściciel, zarządca, lub osoba wskazana do prowadzenia książki,
w związku z kontrolą, o której mowa w art. 62 ust. 1, zapewniają osobie
przeprowadzającej tę kontrolę dostęp do książki obiektu budowlanego
w systemie c-KOB, ww ttyymm do dokonania wpisów.
Art. 60n. 2. Pozbawienie dostępu do książki nie może utrudniać lub
uniemożliwiać osobom przeprowadzającym kontrole, o których mowa w art. 62
ust. 1, wykonywania praw lub obowiązków wynikających z ustawy.
SScchheemmaatt ppoozzyysskkiiwwaanniiaa iinnffoorrmmaaccjjii pprrzzeezz OOPPKK
oo oobbiieekkcciiee bbuuddoowwllaannyymm
WZ/UPK udzielnie
dostępu do c-KOB
dla OPK
OPK zapoznanie się z
WZ/UPK wpis do tablicy
wpisami do tablic Nr III
Nr VI wykonania zaleceń
i VI przed wykonaniem
z kontroli
kontroli
OPK wykonanie kontroli
i wpis do tablicy Nr III
Art. 60o. 1. Główny Inspektor Nadzoru Budowlanego jest administratorem danych
przetwarzanych w systemie c-KOB oraz odpowiada za jego utrzymanie i rozwój.
2. W systemie c-KOB są przechowywane dane osobowe:
1) użytkowników kont:
a) imię i nazwisko, adres zamieszkania,
d) e-mail, numer telefonu – jeżeli został wskazany przez użytkownika konta,
f) numer PESEL – jeżeli został wskazany w ramach uwierzytelnienia,
g) numer uprawnień budowlanych lub decyzji o nadaniu uprawnień albo innych
dokumentów dających podstawę do dokonywania kontroli,
h) tytuł prawny, z którego wynika uprawnienie do reprezentowania właściciela
lub zarządcy obiektu budowlanego
2) dane osobowe znajdujące się:
a) we wpisach dokonanych w książce obiektu budowlanego,
b) w dokumentach załączonych do książki obiektu budowlanego,
c) w dokumentach zapisanych na kontach użytkowników.

### Tabela:
|  |  |
| --- | --- |

Uwaga: podawanie nieprawdziwych danych w formularzu państwowym jest
wykroczeniem opisanym w ustawie KKooddeekkss wwyykkrroocczzeeńń:
Art. 65. § 1. KW Kto umyślnie wprowadza w błąd organ państwowy lub instytucję
upoważnioną z mocy ustawy do legitymowania:
§
§
1) co do tożsamości własnej lub innej osoby,
2) co do swego obywatelstwa, zawodu, miejsca zatrudnienia lub zamieszkania,
podlega karze ograniczenia wolności albo grzywny.
Art. 60q. 1. System c-KOB zapewnia przechowywanie książki obiektu
budowlanego przez okres istnienia obiektu budowlanego.
§
§
2. Po upływie 10 lat od dnia zamknięcia książki obiektu budowlanego dane
zgromadzone w systemie c-KOB dotyczące tej książki są automatycznie
usuwane, z uwzględnieniem przepisów ustawy o narodowym zasobie
archiwalnym i archiwach.
Obowiązki osób wykonujących okresowe kontrole stanu technicznego
obiektu budowlanego, czyli tzw.:
„budowlańców”
●
„kominiarzy”
●
„gazowników”
●
„elektryków”
●
ddoottyycczząąccee wwyyłłąącczznniiee ww pprrzzyyppaaddkkuu ccyyffrroowwyycchh kkssiiąążżeekk lluubb ppaappiieerroowwyycchh
pprroowwaaddzzoonnyycchh nnaa nnoowwyycchh zzaassaaddaacchh ((ddllaa tteerreennóóww zzaammkknniięęttyycchh))
Art. 62b. 1. W terminie 7 dni od dnia zakończenia kontroli obiektu budowlanego, dla
którego istnieje obowiązek prowadzenia książki obiektu budowlanego, osoba
przeprowadzająca kontrolę dokonuje wpisu o kontroli w książce obiektu budowlanego
prowadzonej w postaci:
1) elektronicznej w systemie c-KOB albo
2) papierowej.
2. W terminie 7 dni od dnia zakończenia kontroli obiektu budowlanego osoba
przeprowadzająca kontrolę obiektu wielkopowierzchniowego zawiadamia o kontroli
organ nadzoru budowlanego:
1) za pomocą systemu c-KOB albo
2) na piśmie – jeżeli kontrola dotyczyła obiektu budowlanego, dla którego nie prowadzi
się książki obiektu budowlanego w postaci elektronicznej.
KKaarryy zzwwiiąązzaannee zz ookkrreessoowwyymmii kkoonnttrroollaammii ii pprroowwaaddzzeenniieemm cc--KKOOBB
Art. 93
Kto:
8. w terminie 7 dni od dnia zakończenia kontroli obiektu budowlanego, dla
którego istnieje obowiązek prowadzenia książki obiektu budowlanego
§
§
(dotyczy osoby przeprowadzającej kontrolę), nie dokonuje wpisu o kontroli
w książce obiektu budowlanego, lub nie zawiadamia organu nadzoru
budowlanego o kontroli obiektu wielkopowierzchniowego,
ppooddlleeggaa kkaarrzzee ggrrzzyywwnnyy
KKaarryy zzwwiiąązzaannee zz ookkrreessoowwyymmii kkoonnttrroollaammii ii pprroowwaaddzzeenniieemm cc--KKOOBB
Art. 93. Kto:
9. nie spełnia obowiązków:
Odpowiedzialność
założenia KOB,
●
właściciela lub zarządcy
przechowywania dokumentów związanych obiektu
●
z obiektem budowlanym,
wyznaczenia osoby do prowadzenia KOB,
●
§
§ Odpowiedzialność WZ
zamknięcia KOB,
●
przekazywania KOB,
●
prowadzenia KOB,
●
Odpowiedzialność UPK
dokonywania wpisów w KOB w terminie,
●
udostępniania KOB,
●
podlega karze grzywny
PPoossttęęppoowwaanniiee mmaannddaattoowwee
AArrtt.. 9944 uussttaawwyy PPrraawwoo bbuuddoowwllaannee: Orzekanie w sprawach o czyny, określone w (…) art.
93, następuje na podstawie przepisów KKooddeekkssuu ppoossttęęppoowwaanniiaa ww sspprraawwaacchh
oo wwyykkrroocczzeenniiaa.
Zgodnie z aarrtt.. 9966 ww. kodeksu w postępowaniu mandatowym mmoożżnnaa nałożyć grzywnę
w wysokości ddoo 550000 zł przy jednym wykroczeniu, a przy dwóch lub więcej
§
§
wykroczeniach ddoo 11000000 zł (⇒aarrtt.. 99 §§ 11 ustawy KKooddeekkss wwyykkrroocczzeeńń).
Grzywna jest nakładana w drodze mandatu karnego przez uprawnionych pracowników
organów nadzoru budowlanego.
NNaałłoożżeenniiee mmaannddaattuu wwyymmaaggaa iinnddyywwiidduuaallnneejj oocceennyy wwłłaaśścciiwweeggoo oorrggaannuu
UUssttaanniiee kkaarraallnnoośśccii
AArrtt.. 4455.. §§ 11.. KKooddeekkssuu wwyykkrroocczzeeńń::
Karalność wykroczenia ustaje, jeżeli od czasu jego popełnienia upłynął rok;
§
§
jeżeli w tym okresie wszczęto postępowanie, karalność wykroczenia ustaje
z upływem 2 lat od zakończenia tego okresu.
RRoozzppoorrzząąddzzeenniiee
MMiinniissttrraa RRoozzwwoojjuu ii TTeecchhnnoollooggiiii
z dnia 15 grudnia 2022 r.
ww sspprraawwiiee kkssiiąążżkkii oobbiieekkttuu bbuuddoowwllaanneeggoo
oorraazz ssyysstteemmuu CCyyffrroowwaa KKssiiąążżkkaa OObbiieekkttuu BBuuddoowwllaanneeggoo
Rozporządzenie określa szczegółowy sposób prowadzenia książki obiektu
budowlanego w postaci:
§
§
elektronicznej – przeznaczonej dla większości obiektów,
papierowej – przeznaczonej dla obiektów na terenach zamkniętych,
aa ww ttyymm sszzcczzeeggóółłoowwoo ooppiissuujjee:
zawartość strony tytułowej i poszczególnych tablic,
●
zasady przejścia na książkę cyfrową i zamknięcia tomu papierowego,
●
zasady dodawania załączników,
●
zasady prowadzenia książki papierowej na nowych zasadach, dla obiektów
●
na terenach zamkniętych.
ZZaawwaarrttoośśćć ssttrroonnyy ttyyttuułłoowweejj ii ppoosszzcczzeeggóóllnnyycchh ttaabblliicc
§ § § 3. 1. Na stronie tytułowej książki obiektu budowlanego oraz kolejnych tomów
książki obiektu budowlanego zamieszcza się:
1) rodzaj obiektu budowlanego;
2) adres obiektu budowlanego;
3) datę założenia książki obiektu budowlanego.
2. W przypadku książki obiektu budowlanego w postaci elektronicznej na stronie
tytułowej zamieszcza się również indywidualny numer książki obiektu
budowlanego nadawany przez system c-KOB.
§§ 44.. NNaa ttaabblliiccyy nnrr II zzaammiieesszzcczzaa ssiięę::
1. rodzaj obiektu budowlanego
4. wyposażenie obiektu w instalacje
i urządzenia
2. funkcję obiektu budowlanego
3. charakterystyczne parametry 5. informacje o wymaganych kontrolach
okresowych
techniczne obiektu budowlanego, w
szczególności: informacje o powierzchni
6. plan sytuacyjny obiektu budowlanego
zabudowy budynku, powierzchni dachu
budowli, wysokości, kubaturze, liczbie
7. lokalizację obiektu budowlanego,
kondygnacji nadziemnych i podziemnych,
liczbie lokali mieszkalnych budynku
8. nazwę właściwego organu nadzoru
mieszkalnego wielorodzinnego, rodzaju
budowlanego
konstrukcji nośnej oraz o występowaniu
w obiekcie wyrobów zawierających azbest
§§ 55.. NNaa ttaabblliiccyy nnrr IIII zzaammiieesszzcczzaa ssiięę::
1) dane dotyczące właściciela obiektu
budowlanego: 3) dane dotyczące osoby
a) imię i nazwisko lub nazwę, fizycznej uprawnionej do
b) adres zamieszkania lub siedziby, prowadzenia książki obiektu
budowlanego:
c) e-mail;
a) imię i nazwisko,
2) dane dotyczące zarządcy obiektu
b) adres zamieszkania,
budowlanego, jeżeli występuje:
c) e-mail.
a) imię i nazwisko lub nazwę,
b) adres zamieszkania lub siedziby,
c) e-mail;
§§ 66.. NNaa ttaabblliiccyy nnrr IIIIII zzaammiieesszzcczzaa ssiięę::
1. datę przeprowadzenia kontroli 8. zalecenia wskazujące czynności mające na
celu usunięcie stwierdzonych
2. imię i nazwisko osoby przeprowadzającej
nieprawidłowości wraz z terminem ich
kontrolę
wykonania, jeżeli zostały stwierdzone
3. informacje o numerze, rodzaju i zakresie nieprawidłowości
posiadanych uprawnień budowlanych albo
9.informacje o tym, czy kontrola dotyczyła
innych uprawnień dających podstawę do
obiektu wielkopowierzchniowego
dokonywania kontroli
4. zakres kontroli 10. metody i środki użytkowania elementów
obiektów budowlanych narażonych na
5. ustalenia dokonane w zakresie kontroli
szkodliwe działanie wpływów
atmosferycznych i niszczące działanie innych
6. informację, czy stwierdzone zostały
czynników, w przypadku kontroli tych
nieprawidłowości
elementów
7. informację, czy stwierdzone
11. zakres niewykonanych zaleceń
nieprawidłowości stanowiły uszkodzenia
określonych w protokołach z poprzednich
lub braki, o których mowa w art. 70 PB
kontroli.
CCzzyy oossoobbaa ddookkoonnuujjąąccaa kkoonnttrroollęę ookkrreessoowwąą mmuussii ww KKOOBB wwppiissaaćć
wwsszzyyssttkkiiee zzaalleecceenniiaa zz pprroottookkoołłuu zz kkoonnttrroollii,, cczzyy jjeesstt mmoożżlliiwwoośśćć
wwppiissuu,, żżee zzaalleecceenniiaa zzggooddnniiee zz pprroottookkoołłeemm,, sskkrróóttoowwoo??
Ani przepisy ustawy Prawo budowlane, ani przepisy rozporządzenia w sprawie KOB nie
przewidują możliwości dokonania wpisów skrótowo i odwołania się do zapisów znajdujących
się w protokole:
§§66 RRoozzppoorrzząąddzzeenniiaa: Na tablicy nr III zamieszcza się:
5) ustalenia dokonane w zakresie kontroli;
6) informację, czy stwierdzone zostały nieprawidłowości;
8) zalecenia wskazujące czynności mające na celu usunięcie stwierdzonych
nieprawidłowości wraz z terminem ich wykonania, jeżeli zostały stwierdzone
nieprawidłowości;
§ 7. Na tablicy nr IV zamieszcza się:
§ 9. Na tablicy nr VI zamieszcza się:
1) datę sporządzenia ekspertyzy lub opinii
technicznej;
1) datę rozpoczęcia i zakończenia robót
2) imię i nazwisko osoby, która sporządziła
budowlanych;
ekspertyzę lub opinię techniczną;
3) informacje o przyczynach zlecenia 2) zakres wykonanych robót budowlanych;
opracowania oraz cel, dla którego została
opracowana ekspertyza lub opinia techniczna; 3) dane identyfikujące protokół kontroli, jeśli
wykonane roboty budowlane stanowiły zalecenie z
4) wnioski wynikające z ekspertyzy lub opinii
technicznej; tej kontroli.
5) sposób wykorzystania ekspertyzy lub opinii
§ 10. Na tablicy nr VII zamieszcza się:
technicznej.
1)datę katastrofy budowlanej;
§ 8. Na tablicy nr V zamieszcza się:
2) zakres katastrofy budowlanej;
1) datę i zakres przeprowadzonego przeglądu
technicznego, konserwacji lub naprawy 3) ustalone przyczyny katastrofy budowlanej.
urządzeń przeciwpożarowych;
§ 11. Na tablicy nr VIII zamieszcza się:
2) imię i nazwisko osoby, która dokonała
1) oznaczenie organu administracji publicznej;
przeglądu technicznego, konserwacji
lub naprawy urządzeń przeciwpożarowych; 2) datę wydania decyzji, postanowienia,
3) wnioski z dokonanego przeglądu zaświadczenia lub innego dokumentu;
technicznego, konserwacji lub naprawy 3) informacje dotyczące rodzaju i treści wydanej
urządzeń przeciwpożarowych. decyzji, postanowienia, zaświadczenia lub innego
dokumentu.
KKiieeddyy pprrzzeecchhooddzziimmyy nnaa nnoowwąą kkssiiąążżkkęę ??
§ 13. 1. W przypadku bbrraakkuu mmiieejjssccaa w odpowiedniej tablicy na dokonanie
kolejnego wpisu w książce obiektu budowlanego w postaci papierowej
zakłada się kolejny tom książki obiektu budowlanego w postaci papierowej
albo książkę obiektu budowlanego w postaci elektronicznej.
lub możemy przejść na nową cyfrową książkę kiedy tylko chcemy.
KKiieeddyy pprrzzeecchhooddzziimmyy nnaa nnoowwąą kkssiiąążżkkęę ??
§ 13. 2. W przypadku założenia:
kolejnego tomu książki obiektu budowlanego w postaci papierowej
●
albo
książki obiektu budowlanego w postaci elektronicznej,
●
w poszczególnych tablicach dotychczas prowadzonej książki, w których
pozostało miejsce na dokonanie nowych wpisów, sporządza się adnotacje
oo kkoonnttyynnuuaaccjjii wwppiissóóww w kolejnym tomie albo w książce obiektu
budowlanego w postaci elektronicznej.
DDooddaawwaanniiee zzaałłąącczznniikkóóww ddoo wwppiissóóww ddoo cc--KKOOBB
Przy zakładaniu c-KOB system c-KOB wymaga obligatoryjnie dodania następujących
załączników:
uprawnienie do reprezentowania właściciela/zarządcy (jeśli taka osoba
●
występuje),
tytuł prawny właściciela do nieruchomości,
●
tytuł prawny zarządcy do nieruchomości (jeśli występuje),
●
plan sytuacyjny.
●
KKaażżddyy zz ttyycchh zzaałłąącczznniikkóóww mmoożżee bbyyćć ttyyllkkoo ww jjeeddnnyymm pplliikkuu ((aallee nnpp.. wwiieelloossttrroonniiccoowwyymm))..

### Tabela:
| P | rzy zakładaniu c-KOB |
| --- | --- |

DDooddaawwaanniiee zzaałłąącczznniikkóóww ddoo wwppiissóóww ddoo cc--KKOOBB
W przypadku tablic 1, 3, 4, 5, 6, 7, 8 system c-KOB nie wymaga dodawania załączników, ale ssąą
oonnee wwyymmaaggaannee na podstawie art. 64 ust. 3 ustawy Prawo budowlane:
protokoły z kontroli obiektu budowlanego,
●
protokoły z kontroli systemu ogrzewania i systemu klimatyzacji, o których mowa
●
w ustawie o charakterystyce energetycznej budynków,
oceny i ekspertyzy dotyczące jego stanu technicznego,
●
świadectwo charakterystyki energetycznej,
●
dokumenty, o których mowa w art. 60,
●
ssąą ddoołłąącczzoonnee do książki obiektu budowlanego.
PPoowwyyżżsszzee zzaałłąącczznniikkii mmooggąą bbyyćć ww wwiieelluu pplliikkaacchh
DDooddaawwaanniiee zzaałłąącczznniikkóóww ddoo wwppiissóóww ddoo cc--KKOOBB
§ 14. Do książki obiektu budowlanego w postaci elektronicznej
mogą być załączane dokumenty w postaci elektronicznej.
!
! !
!
SSyysstteemm cc--KKOOBB aakkcceeppttuujjee pplliikkii ww ffoorrmmttaacchh:: ppddff,, jjppgg,, ttiiff,, zziipp,, ppnngg,,
oo mmaakkssyymmaallnneejj wwiieellkkoośśccii pplliikkuu ddoo 55 MMBB
RRoozzddzziiaałł 33
WWppiissyy ww kkssiiąążżccee oobbiieekkttuu bbuuddoowwllaanneeggoo ((ppaappiieerroowweejj))
§3. 3. W przypadku książki obiektu budowlanego w postaci papierowej na stronie tytułowej
zamieszcza się również:
1) rodzaj obiektu budowlanego;
2) adres obiektu budowlanego;
3) numer tomu;
4) liczbę stron;
5) datę założenia książki obiektu budowlanego.
§ 12. Książkę obiektu budowlanego w postaci papierowej prowadzi się na ponumerowanych
stronach w formacie A-4 w taki sposób, aby książka obiektu budowlanego była chroniona
przed usunięciem lub wymianą stron.
WWppiissyy ww kkssiiąążżccee oobbiieekkttuu bbuuddoowwllaanneeggoo ((ppaappiieerroowweejj))
§ 16. 1. Wpisy w książce obiektu budowlanego w poszczególnych tablicach zamieszcza się
w porządku chronologicznym, w sposób uniemożliwiający dokonanie późniejszych
uzupełnień.
2. Jeżeli wpis w książce obiektu budowlanego zawiera dane identyfikujące:
1) zdarzenie, które to dane są objęte klauzulą tajności, wpis ogranicza się do wskazania
tej okoliczności i dokumentu, z którego wynika objęcie tych danych klauzulą tajności;
2) dokument będący przedmiotem wpisu, który jest objęty klauzulą tajności albo zawiera
informacje objęte klauzulą tajności, we wpisie wskazuje się na tę okoliczność.
WWppiissyy ww kkssiiąążżccee oobbiieekkttuu bbuuddoowwllaanneeggoo ((ppaappiieerroowweejj))
§ 17. 1. W razie konieczności wprowadzenia poprawek do dokonanych już wpisów należy
dokonać kolejnego wpisu poprzez wprowadzenie właściwej treści z uzasadnieniem
wprowadzonej zmiany.
2. W razie konieczności wprowadzenia poprawek do dokonanych już wpisów w książce
obiektu budowlanego w postaci papierowej dopuszcza się skreślenie niewłaściwego tekstu
w sposób umożliwiający jego odczytanie i wprowadzenie właściwej treści, z uzasadnieniem
wprowadzonej zmiany. Należy także zamieścić imię i nazwisko osoby dokonującej poprawki
lub skreślenia, datę dokonania tej czynności oraz czytelny podpis tej osoby.
§ 18. Wpisów w książce obiektu budowlanego dokonuje się w sposób trwały i czytelny.
WWppiissyy ww kkssiiąążżccee oobbiieekkttuu bbuuddoowwllaanneeggoo ((ppaappiieerroowweejj))
§ 19. Każdy wpis jest opatrzony:
1) datą;
2) imieniem i nazwiskiem osoby dokonującej wpisu;
3) czytelnym podpisem osoby dokonującej wpisu w książce obiektu budowlanego
w postaci papierowej lub systemowym potwierdzeniem tożsamości w książce obiektu
budowlanego w postaci elektronicznej.
PPrraaccaa zz ccyyffrroowwąą KKssiiąążżkkąą OObbiieekkttuu BBuuddoowwllaanneeggoo
ćwiczenia praktyczne
cc--kkoobb..gguunnbb..ggoovv..ppll

PPrreezzeennttaaccjjaa rrzzeecczzyywwiisstteejj cc--KKOOBB
cczzyyllii kkrrookk ppoo kkrrookkuu,, eekkrraann ppoo eekkrraanniiee,, jjaakk ppoorruusszzaaćć ssiięę ppoo rrzzeecczzyywwiisstteejj
ppllaattffoorrmmiiee ccKKOOBB::
zzaakkłłaaddaanniiee cc--KKOOBB
●
wwpprroowwaaddzzaanniiee ddaannyycchh
●
iinntteerreessaarriiuusszzee
●
oorraazz pprrzzeegglląądd ppoosszzcczzeeggóóllnnyycchh ttaabblliicc
●
UUzzuuppeełłnniieenniiee ddoo pprreezzeennttaaccjjii oonn--lliinnee
Jakie komunikaty będziemy widzieć po zakończeniu wprowadzania
danych do założenia c-KOB?
Aby wyjść bez zapisywania, należy wrócić na początek formularza
(do góry strony) i kliknąć „ Wróć do poprzedniego widoku”

00-000 Warszawa Krzak Sp. z o.o.
ulica Wiejska 16
CCiiąągg ddaallsszzyy pprreezzeennttaaccjjii oonn--lliinnee
Praca z założoną cyfrową Książką Obiektu Budowlanego
AApplliikkaaccjjaa cc--KKOOBB nnaa tteelleeffoonn


WWppiissyy ddoo ttaabblliiccyy NNrr IIIIII
wwiiddookk oossoobbyy pprrzzeepprroowwaaddzzaajjąącceejj kkoonnttrroollee OOPPKK
Osoba wykonująca kontrole (OPK), o których mowa w art. 62 ust. 1 PB, musi:
w panelu  Moje konto  w Danych użytkownika wprowadzić swoje
uprawnienia zawodowe:
a) poprzez ECRUB + dołączenie skanu uprawnień
lub
b) wprowadzić uprawnienia poprzez okna dialogowe +
dołączenie skanu uprawnień.
Po zaproszeniu OPK do wykonania kontroli (poprzez narzędzie
Interesariusze KOB), na jego koncie w systemie cKOB pojawi się komunikat:
Zostałeś/aś zaproszony/a przez JAN KOWALSKI (jan@kowalski.pl) jako
interesariusz do pełnienia roli Osoba prowadząca kontrole na obiekcie
o funkcji magazyn ABC zlokalizowanym: 00-000 Warszawa, ulica Wiejska 16 -
książka obiektu budowlanego o numerze CKOB/MAZ/2024/000. Kliknij
zatwierdź, aby przyjąć rolę. Kliknij odrzuć, aby odrzucić zaproszenie.
oraz na e-mailu zaproszonego:
Zostałeś/aś zaproszony/a przez JAN KOWALSKI (jan@kowalski.pl) jako interesariusz do
pełnienia roli Osoba przeprowadzająca kontrole obiektu na obiekcie o funkcji magazyn ABC
zlokalizowanym: 00-000 Warszawa, ulica Wiejska 16 - książka obiektu budowlanego o
numerze CKOB/MAZ/2023/000.
Kliknij poniższy przycisk, aby zatwierdzić przyjęcie roli:
Zatwierdź
Jeśli coś poszło nie tak, skopiuj poniższy adres do przeglądarki internetowej: https://c-
kob.gunb.gov.pl/konto/ksiazka-obiektu-budowlanego/2364/interesariusz/201947?
confirm=true&isRegistered=true
Kliknij poniższy przycisk, aby odrzucić przyjęcie roli:
Odrzuć
Jeśli coś poszło nie tak, skopiuj poniższy adres do przeglądarki internetowej: https://c-
kob.gunb.gov.pl/konto/ksiazka-obiektu-budowlanego/2364/interesariusz/201947?
decline=true&isRegistered=true
Pozdrawiamy,
Zespół c-KOB.

### Tabela:
| Zostałeś/aś zaproszony/a przez JAN KOWALSKI (jan@kowalski.pl) jako interesariusz do pełnienia roli Osoba przeprowadzająca kontrole obiektu na obiekcie o funkcji magazyn ABC zlokalizowanym: 00-000 Warszawa, ulica Wiejska 16 - książka obiektu budowlanego o numerze CKOB/MAZ/2023/000. |
| --- |
| Kliknij poniższy przycisk, aby zatwierdzić przyjęcie roli: Zatwierdź |
| Jeśli coś poszło nie tak, skopiuj poniższy adres do przeglądarki internetowej: https://c- kob.gunb.gov.pl/konto/ksiazka-obiektu-budowlanego/2364/interesariusz/201947? confirm=true&isRegistered=true |
| Kliknij poniższy przycisk, aby odrzucić przyjęcie roli: Odrzuć |
| Jeśli coś poszło nie tak, skopiuj poniższy adres do przeglądarki internetowej: https://c- kob.gunb.gov.pl/konto/ksiazka-obiektu-budowlanego/2364/interesariusz/201947? decline=true&isRegistered=true |
| Pozdrawiamy, |
| Zespół c-KOB. |

WWyyssłłaanniiee zzaawwiiaaddoommiieenniiaa ddoo nnaaddzzoorruu bbuuddoowwllaanneeggoo oo::
kkoonnttrroollii oobbiieekkttuu wwiieellkkooppoowwiieerrzzcchhnniioowweeggoo,,
●
lluubb
ssttwwiieerrddzzeenniiuu nniieepprraawwiiddłłoowwoośśccii,, oo kkttóórryycchh mmoowwaa ww aarrtt.. 7700 PPbb..
●
Na końcu wpisu, po kliknięciu w "dodaj wpis" system wyświetla okienko z zapytaniem:
czy wysłać zawiadomienie o kontroli obiektu wielkopowierzchniowego,
●
lub
czy wysłać zawiadomienie o nieprawidłowościach, o których mowa w art. 70 Pb.
●
Jeśli ktoś kliknął "nie", to można (jeśli nie upłynęło 30 dni po dodaniu wpisu)
DDzziięękkuujjęę zzaa uuwwaaggęę
30.03.26
MMiicchhaałł SSuubbssttyykk

### Tabela:
| DDzziięękkuujjęę zzaa uuwwaaggęę |  |
| --- | --- |
|  |  |
| 30.03.26 MMiicchhaałł SSuubbssttyykk |  |

### Tabela:
|  |  |
| --- | --- |
|  |  |

### Tabela:
|  |  |  |
| --- | --- | --- |
| DDzzii | ęękkuujjęę zzaa u | uwwaaggęę |

8. Szczegółowy wykaz i zawartość Tablic (Mapowanie Funkcjonalne)
Każda książka w systemie c-KOB podzielona jest na 8 ustandaryzowanych tablic. Agent AI powinien instruować użytkowników o ich przeznaczeniu w następujący sposób:

Tablica I: Dane identyfikacyjne obiektu – Zawiera adres, numer ewidencyjny działki, kategorię obiektu oraz informacje o jego funkcji. Edytowana głównie na etapie zakładania książki przez WZ.

Tablica II: Dane właściciela lub zarządcy – Rejestr osób odpowiedzialnych prawnie za obiekt. Wymaga podania danych kontaktowych i okresu odpowiedzialności.

Tablica III: Protokoły kontroli okresowych – Kluczowa sekcja dla OPK. To tutaj wprowadzane są wyniki przeglądów (rocznych, 5-letnich, gazowych, kominiarskich). Każdy wpis wymaga określenia zakresu kontroli oraz wskazania, czy stwierdzono nieprawidłowości.

Tablica IV: Roboty budowlane – Rejestr wszelkich prac wykonywanych w obiekcie po oddaniu do użytkowania, które wymagają pozwolenia na budowę lub zgłoszenia.

Tablica V: Katastrofy budowlane – Rejestr zdarzeń o charakterze katastrofy, zawierający opis przyczyn i podjętych działań naprawczych.

Tablica VI: Decyzje, postanowienia i inne akty organów – Dokumentacja działań administracyjnych (np. nakazy PINB, decyzje o zmianie sposobu użytkowania).

Tablica VII: Dokumentacja techniczna i ekspertyzy – Miejsce na załączniki w formie projektów, opinii technicznych oraz ekspertyz stanu technicznego.

Tablica VIII: Wykaz osób upoważnionych do prowadzenia książki – Lista wszystkich osób z rolą UPK, które mają prawo dokonywać wpisów technicznych w imieniu właściciela.

9. Procedura dodawania Planu Sytuacyjnego i Walidacja Plików
Pierwszą czynnością po założeniu cKOB przez WZ/UPK musi być dodanie planu sytuacyjnego. Agent AI musi o tym przypominać przy pytaniach o inicjację nowej książki.

Wymagania merytoryczne planu: Musi on zawierać czytelne zaznaczenie granic działki, usytuowanie obiektu, drogi dojazdowe dla służb ratunkowych (ppoż), rozmieszczenie hydrantów oraz punkty odcięcia instalacji (gaz, prąd, woda).

Wymagania techniczne plików:
- Maksymalny rozmiar: 5 MB na jeden plik.
- Formaty: PDF, JPG, TIF, PNG, ZIP.
- Metadane załącznika: Przy dodawaniu dokumentu (np. uprawnień budowlanych OPK), system wymusza podanie numeru dokumentu oraz daty jego wydania. Bez tych pól przycisk "Zapisz" pozostaje nieaktywny.

10. Statusy wpisów: "Wersja Robocza" vs "Zatwierdzony"
Zrozumienie cyklu życia wpisu jest krytyczne dla uniknięcia błędów prawnych przez inżyniera:

Wersja robocza (Draft): Po wprowadzeniu danych, ale przed ostatecznym zatwierdzeniem, wpis ma status roboczy. Jest on widoczny wyłącznie dla autora. W tym stanie nie wywołuje skutków prawnych (np. nie liczy się jako dokonanie wpisu w terminie 7 dni).

Zatwierdzenie wpisu: Kliknięcie przycisku „ZATWIERDŹ” publikuje wpis. Od tego momentu staje się on widoczny dla WZ, UPK i organów kontrolnych.

Blokada edycji: Od momentu zatwierdzenia wpisu w Tablicy III (kontrole), OPK ma 30 dni na wprowadzenie ewentualnych korekt lub anulowanie wpisu. Po tym terminie edycja zostaje systemowo zablokowana.

## Implementacja Techniczna dla Dewelopera (Context Caching & Enrichment)
Dzięki wdrożeniu skryptów naprawczych i API Google Search, Twoja aplikacja zyskuje przewagę operacyjną. Aby zintegrować to z Agentem AI:

1. Rozdział Danych: Skrypt enrich_engineers.cjs służy do zasilania bazy danych inżynierów (CRM/Panel Admina). Dane z pliku cKOB_biblia.md służą wyłącznie jako kontekst dla LLM.

2. Wdrożenie Context Caching: Z uwagi na to, że kompletna "biblia" (wraz z powyższymi uzupełnieniami) przekracza 30 000 tokenów, należy użyć mechanizmu Context Caching w Gemini API.
   - Plik .md jest ładowany jako cachedContent.
   - Każde zapytanie inżyniera w czacie korzysta z tego samego identyfikatora cache, co redukuje koszty o 90% i skraca czas odpowiedzi (TTFT - Time To First Token).

3. Walidacja typów: W skrypcie enrich_engineers.cjs należy zachować wprowadzoną poprawkę String(id), co zapobiegnie błędom przy automatycznym dopisywaniu znalezionych e-maili do rekordów inżynierów w bazie danych.

