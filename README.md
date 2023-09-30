# Gruppe11
<br>

![Semantic description of image](Design_System.jpg)


# EveryCent
- WebApp für Online Flohmarkt

## Technologies
- Frontend: **Angular**
- Backend:  **Node JS**
- Database: **MongoDB**

## Design 

### [Link for Mockup Design ](https://www.figma.com/file/pVUlarB3jvQJ339Hzii7xP/everycent?node-id=79%3A2&t=uLUPgowncZaLY1o9-1)


## Funktionen
### User Verwaltung
- Register
- Login
- Meine Beiträge verwalten

![Semantic description of image](Login.gif)

<br>

### Post Verwaltung
- Create
- Read
- Update
- Delete

![Semantic description of image](Crud.gif)


<br>

### Responsive Design
- Web version
- Mobile version

![Semantic description of image](Responsive.gif)


<br>

## Was jeder hat bisher gemacht 
### Hyun Kim

Frontend

- Erstellen UI : Login Page / Signup Page / Header Component
- Verbindungseinstellungen für den Anschluss des Client- und Server-Seite 

Backend

- Aufbau von Server mit NodeJS 
- Verbindung mit MongoDB als Dabtabase
- User verwalten: Register / Login
- Post verwalten: CRUD Funktion
- Hashing password: Verbesserte Sicherheit
- Verwaltung der Authentication - PassportJS Module

### Hyejin Kang

- Erstellen Design system und Prototype (mit Figma)
- Create Komponent : product-cardlist / main navigation / float button
- Create Page : main page / after search page / my page
- Create card model
- Routing from main page to card list and detail page
- Set Guard Routing
- Data binding from main page to card list and detail page mit card CRUD service
- Feature Search function mit share data service
- Refactor Header service
- Überprüfen und Vereinheitlichung der Mediaquery Spec für Mobilgeräte


### Minseon Kim

- Workflow von den gesamten Seiten erstellen
- Card Model erstellen
- Detailinformationsseite von einem Produktpost erstellen
- Prüfungsfunktionen, ob die eigegebenen Daten gültig sind
- Logout Btn und Funktionen implementieren

### Hanbit Jang

Frontend

- Erstellen der Produktregisterseite
- Vorschau für die Bilddatei
- Übertragen der Produktinformationen in die Datenbank
- Verbindung der CRUD funktion für die Anzeigen
- Routing zur Produktregisterseite

Backend

- Speichern der Bilddatei in lokalen Ordner

<br>

## TODO

- [ ] ~~Logout Component + function + bind backend + alert window(success)~~
- [ ] ~~Postcard edit / delete function (edit => register page) + data bind + alert window~~
- [ ] ~~Search result (if without search result)~~
- [ ] ~~Login/Signup success popup window~~
- [ ] ~~Testing - error / bug~~
