# Praca inżynirska 2023
"Projekt i implementacja aplikacji wspomagającej pracę sklepu zoologicznego."
Autor: Patrycja Kalita

## Uruchomienie projektu
Projekt został wykonany w środowisku programistycznym WebStorm 2021.2.3. Baza danych znajdowała się w środowisku MongoDBCompass.

Pierwszy krokiem do uruchomienia projektu jest stworzenie nowego połączenia w MongoDBCompass, z ustawionym uri jako: `mongodb://localhost:27017`. Następnie połączyć się.

Następnie należy otworzyć terminal w folderze "HouseOfPets\backend" i uruchomić polecenie `npm install`.
Po wykonaniu się tego polecenia można uruchomić część backendową wpisując polecenie `npm start`.

Po uruchomieniu, należy wrócić do MongoDBCompass i odświeżyć (View -> Reload data). Powinna znajdować się tam baza danych "houseofpets". Po rozwinięciu jej powinno być widocznych 11 kolekcji.
Każdą kolekcję należy uzupełnić przykładowymi danymi. Aby to wykonać należy w programie kliknąć na kolekcję np. "ages".
Następnie należy kliknąć na przycisk "ADD DATA" i z wyświetlonego menu wybrać opcję "Import file".
Pojawi się okno. Należy kliknąć na przycisk "Select a file...".  Z folderu "HouseOfPets\database" należy wybrać plik o takiej samej nazwie co kolekcja, w tym przykładzie jest to plik ages.json.
Gdy plik się poprawnie załaduje należy kilknąć przycisk "Import". Dane zotsały dodane. Te kroki należy powtórzyć dla wszystkich kolekcji w bazie.

Po zakończeniu dodawania danych w folderze "HouseOfPets\frontend", należy otworzyć terminal i uruchomić polecenie `npm install --froce`.
Po zakończeniu instalacji, należy wpisać polecenie `npm start`. W domyślnie ustawionej przeglądarce w systemie powinno się otworzyć okno z uruchomioną aplikacją. Jeśli aplikacja sama nie otworzy się w przeglądarce to należy w niej podać ścieżkę `http://localhost:3000/`.

### Logowanie
Aby zalogować się na konto użytkownika należy podać następujące dane:
Login: Qlita
Hasło: password

Aby zalogować się na konto pracownika należy podać następujące dane:
Login: admin
Hasło: 12345678
