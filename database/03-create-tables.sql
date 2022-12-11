CREATE TABLE IF NOT EXISTS Dawkowania (
    ID BIGINT NOT NULL AUTO_INCREMENT,
    Masa_ciala VARCHAR(10) NOT NULL,
    Umiarkowane_potrzeby VARCHAR(10) NOT NULL,
    Niskie_potrzeby VARCHAR(10) NOT NULL,
    PRIMARY KEY (`ID`)
)  ENGINE=INNODB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS Skladniki_analityczne (
    ID BIGINT NOT NULL AUTO_INCREMENT,
    Bialko_surowe VARCHAR(10) NOT NULL,
    Tluszcze_surowe VARCHAR(10) NOT NULL,
    Popiol_surowy VARCHAR(10) NOT NULL,
    Wlokno_surowe VARCHAR(10) NOT NULL,
    PRIMARY KEY (`ID`)
)  ENGINE=INNODB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS Sklady (
    ID BIGINT NOT NULL AUTO_INCREMENT,
    Sklad VARCHAR(255) NOT NULL,
    Dodatki VARCHAR(255) NOT NULL,
    PRIMARY KEY (`ID`)
)  ENGINE=INNODB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS Opisy (
    ID BIGINT NOT NULL AUTO_INCREMENT,
    Opisy VARCHAR(255) NOT NULL,
    Dodatkowy_opis VARCHAR(255) NOT NULL,
    Zdjecie VARCHAR(255) NOT NULL,
    PRIMARY KEY (`ID`)
)  ENGINE=INNODB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS Kategorie (
    ID BIGINT NOT NULL AUTO_INCREMENT,
    Nazwa VARCHAR(255) NOT NULL,
    Link VARCHAR(255) NOT NULL,
    PRIMARY KEY (`ID`)
)  ENGINE=INNODB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS Rasy (
    ID BIGINT NOT NULL AUTO_INCREMENT,
    Nazwa VARCHAR(255) NOT NULL,
    PRIMARY KEY (`ID`)
)  ENGINE=INNODB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS Wiek (
    ID BIGINT NOT NULL AUTO_INCREMENT,
    Liczba INT NOT NULL,
    Nazwa VARCHAR(255) NOT NULL,
    PRIMARY KEY (`ID`)
)  ENGINE=INNODB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS Waga (
    ID BIGINT NOT NULL AUTO_INCREMENT,
    Liczba INT NOT NULL,
    PRIMARY KEY (`ID`)
)  ENGINE=INNODB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS Rodzaje_zwierzat (
    ID BIGINT NOT NULL AUTO_INCREMENT,
    Nazwa VARCHAR(10) NOT NULL,
    PRIMARY KEY (`ID`)
)  ENGINE=INNODB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS Zestawy_produktow (
    ID BIGINT NOT NULL AUTO_INCREMENT,
    Nazwa VARCHAR(255) NOT NULL,
    Link VARCHAR(255) NOT NULL,
    Cena FLOAT NOT NULL,
    Kod_zestawu VARCHAR(25) NOT NULL,
    PRIMARY KEY (`ID`)
)  ENGINE=INNODB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS Typy_uzytkownikow (
    ID BIGINT NOT NULL AUTO_INCREMENT,
    Typy VARCHAR(100) NOT NULL,
    PRIMARY KEY (`ID`)
)  ENGINE=INNODB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS Rodzaje_dostaw (
    ID BIGINT NOT NULL AUTO_INCREMENT,
    Nazwa VARCHAR(255) NOT NULL,
    Cena FLOAT NOT NULL,
    PRIMARY KEY (`ID`)
)  ENGINE=INNODB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS Rodzaje_platnosci (
    ID BIGINT NOT NULL AUTO_INCREMENT,
    Nazwa VARCHAR(255) NOT NULL,
    Cena FLOAT NOT NULL,
    PRIMARY KEY (`ID`)
)  ENGINE=INNODB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS Uzytkownicy (
    ID BIGINT NOT NULL AUTO_INCREMENT,
    ID_typ_uzytkownika BIGINT NOT NULL,
    Nazwa VARCHAR(100) NOT NULL,
    Haslo VARCHAR(100) NOT NULL,
    Imie VARCHAR(100) NOT NULL,
    Nazwisko VARCHAR(100) NOT NULL,
    Telefon INT NOT NULL,
    Mail VARCHAR(100) NOT NULL,
    Adres VARCHAR(200) NOT NULL,
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`ID_typ_uzytkownika`)
        REFERENCES `Typy_uzytkownikow` (`ID`)
)  ENGINE=INNODB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS Koszyk (
    ID BIGINT NOT NULL AUTO_INCREMENT,
    ID_uzytkownika BIGINT NOT NULL,
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`ID_uzytkownika`)
        REFERENCES `Uzytkownicy` (`ID`)
)  ENGINE=INNODB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS Zamowienia (
    ID BIGINT NOT NULL AUTO_INCREMENT,
    Numer_zamowienia VARCHAR(100) NOT NULL,
    Data_zamowienia DATE NOT NULL,
    Status_zamowienia VARCHAR(100) NOT NULL,
    ID_rodzaj_dostawy BIGINT NOT NULL,
    Adres_dostawy VARCHAR(200) NOT NULL,
    Wartosc_zamowienia FLOAT NOT NULL,
    ID_rodzaj_platnosci BIGINT NOT NULL,
    Faktura VARCHAR(255) NOT NULL,
    ID_uzytkownika BIGINT NOT NULL,
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`ID_rodzaj_dostawy`)
        REFERENCES `Rodzaje_dostaw` (`ID`),
    FOREIGN KEY (`ID_rodzaj_platnosci`)
        REFERENCES `Rodzaje_platnosci` (`ID`),
    FOREIGN KEY (`ID_uzytkownika`)
        REFERENCES `Uzytkownicy` (`ID`)
)  ENGINE=INNODB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS Zwierzeta_do_adopcji (
    ID BIGINT NOT NULL AUTO_INCREMENT,
    ID_rodzaj_zwierzecia BIGINT NOT NULL,
    ID_rasa BIGINT NOT NULL,
    Imie VARCHAR(100) NOT NULL,
    ID_wiek BIGINT NOT NULL,
    ID_waga BIGINT NOT NULL,
    Data_wystawienia_do_adopcji DATE NOT NULL,
    Zdjecie VARCHAR(255) NOT NULL,
    Telefon INT NOT NULL,
    Mail VARCHAR(100) NOT NULL,
    Adres VARCHAR(100) NOT NULL,
    Krotki_opis VARCHAR(255) NOT NULL,
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`ID_rodzaj_zwierzecia`)
        REFERENCES `Rodzaje_zwierzat` (`ID`),
    FOREIGN KEY (`ID_wiek`)
        REFERENCES `Wiek` (`ID`),
    FOREIGN KEY (`ID_waga`)
        REFERENCES `Waga` (`ID`),
    FOREIGN KEY (`ID_rasa`)
        REFERENCES `Rasy` (`ID`)
)  ENGINE=INNODB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS Zwierzeta (
    ID BIGINT NOT NULL AUTO_INCREMENT,
    ID_rodzaj_zwierzecia BIGINT NOT NULL,
    ID_rasa BIGINT NOT NULL,
    ID_wiek BIGINT NOT NULL,
    ID_waga BIGINT NOT NULL,
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`ID_rodzaj_zwierzecia`)
        REFERENCES `Rodzaje_zwierzat` (`ID`),
    FOREIGN KEY (`ID_wiek`)
        REFERENCES `Wiek` (`ID`),
    FOREIGN KEY (`ID_waga`)
        REFERENCES `Waga` (`ID`),
    FOREIGN KEY (`ID_rasa`)
        REFERENCES `Rasy` (`ID`)
)  ENGINE=INNODB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS Produkty (
    ID BIGINT NOT NULL AUTO_INCREMENT,
    Link VARCHAR(200) NOT NULL,
    Nazwa VARCHAR(200) NOT NULL,
    Producent VARCHAR(100) NOT NULL,
    Cena FLOAT NOT NULL,
    Ilosc INT NOT NULL,
    Data_waznosci DATE NULL,
    Waga INT NULL,
    Kolor VARCHAR(30) NULL,
    Kod_produktu INT NOT NULL,
    Zdjecie VARCHAR(255) NOT NULL,
    ID_zwierzecia BIGINT NOT NULL,
    ID_kategorii BIGINT NOT NULL,
    ID_opisu BIGINT NOT NULL,
    ID_skladu BIGINT NOT NULL,
    ID_skladnikow_analitycznych BIGINT NULL,
    ID_dawkowania BIGINT NULL,
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`ID_zwierzecia`)
        REFERENCES `Zwierzeta` (`ID`),
    FOREIGN KEY (`ID_kategorii`)
        REFERENCES `Kategorie` (`ID`),
    FOREIGN KEY (`ID_opisu`)
        REFERENCES `Opisy` (`ID`),
    FOREIGN KEY (`ID_skladu`)
        REFERENCES `Sklady` (`ID`),
    FOREIGN KEY (`ID_skladnikow_analitycznych`)
        REFERENCES `Skladniki_analityczne` (`ID`),
    FOREIGN KEY (`ID_dawkowania`)
        REFERENCES `Dawkowania` (`ID`)
)  ENGINE=INNODB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS Zestawy_Produkty (
    ID_zestawu BIGINT NOT NULL,
    ID_produktu BIGINT NOT NULL,
    FOREIGN KEY (`ID_zestawu`)
        REFERENCES `Zestawy_produktow` (`ID`),
    FOREIGN KEY (`ID_produktu`)
        REFERENCES `Produkty` (`ID`)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS Koszyk_Produkty_Zestawy (
    ID_koszyka BIGINT NOT NULL,
    ID_produktu BIGINT NOT NULL,
    ID_zestawu BIGINT NOT NULL,
    FOREIGN KEY (`ID_koszyka`)
        REFERENCES `Koszyk` (`ID`),
    FOREIGN KEY (`ID_produktu`)
        REFERENCES `Produkty` (`ID`),
    FOREIGN KEY (`ID_zestawu`)
        REFERENCES `Zestawy_produktow` (`ID`)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS Promocje (
    ID BIGINT NOT NULL AUTO_INCREMENT,
    Znizka INT NOT NULL,
    Data_dokad_trwa_promocja DATE NULL,
    ID_zestawu BIGINT NOT NULL,
    ID_produktu BIGINT NOT NULL,
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`ID_zestawu`)
        REFERENCES `Zestawy_produktow` (`ID`),
    FOREIGN KEY (`ID_produktu`)
        REFERENCES `Produkty` (`ID`)
)  ENGINE=INNODB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS Opinie (
    ID BIGINT NOT NULL AUTO_INCREMENT,
    Uzytkownik VARCHAR(100) NOT NULL,
    Opinia VARCHAR(255) NOT NULL,
    Ilosc_gwiazdek INT NOT NULL,
    ID_zestawu BIGINT NOT NULL,
    ID_produktu BIGINT NOT NULL,
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`ID_zestawu`)
        REFERENCES `Zestawy_produktow` (`ID`),
    FOREIGN KEY (`ID_produktu`)
        REFERENCES `Produkty` (`ID`)
)  ENGINE=INNODB AUTO_INCREMENT=1;