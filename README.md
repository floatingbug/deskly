Projektspezifikation: Co-Working-Space Buchungssystem ("Raumzeit")

1. Projektziel

Entwicklung einer Webanwendung, mit der Nutzer Co-Working-Spaces suchen, anzeigen und buchen können. Admins können neue Spaces verwalten. Fokus liegt auf der Backend-Funktionalität mit Node.js/Express.js, MongoDB und Vue.js.

2. Technologien

Schicht

Stack

Frontend

Vue.js 3, PrimeVue v4, Vue Router, Pinia

Backend

Node.js, Express.js

Datenbank

MongoDB (mit Mongoose)

Auth

JSON Web Tokens (JWT), bcrypt

Styling

PrimeFlex, PrimeVue

3. Benutzerrollen

Rolle

Berechtigungen

User

Registrieren, Einloggen, Spaces durchsuchen, buchen, eigene Buchungen verwalten

Admin

Zusätzlich: Spaces anlegen, bearbeiten, löschen, alle Buchungen einsehen

4. Hauptfunktionen

4.1 Benutzersystem

Registrierung (E-Mail, Passwort)

Login / Logout (JWT)

Rolle "user" oder "admin"

Passwort-Hashing (bcrypt)

4.2 Co-Working-Spaces

CRUD durch Admins

Eigenschaften: Name, Ort, Beschreibung, Ausstattung, Stundensatz, Bild, Verfügbarkeit

Öffentliche Liste und Detailseite für alle User

4.3 Buchungssystem

Nutzer können Datum/Zeit auswählen

Verfügbarkeitsprüfung (keine Überlappung)

Preisberechnung (Zeitspanne × Preis/h)

Anzeige eigener Buchungen

5. REST-API-Spezifikation (Backend)

Methode

Endpoint

Beschreibung

Rolle

POST

/api/register

Registrierung

Öffentlich

POST

/api/login

Login

Öffentlich

GET

/api/spaces

Liste aller Spaces

Alle

GET

/api/spaces/:id

Details eines Spaces

Alle

POST

/api/spaces

Neuen Space anlegen

Admin

PUT

/api/spaces/:id

Space bearbeiten

Admin

DELETE

/api/spaces/:id

Space löschen

Admin

GET

/api/bookings

Eigene Buchungen anzeigen

User/Admin

POST

/api/bookings

Neue Buchung erstellen

User

DELETE

/api/bookings/:id

Buchung stornieren

User

6. Frontend-Seiten

Seite

Inhalte & Komponenten

Home

Suchfeld, Select, DatePicker, Card-Grid

Login/Register

Formulare mit InputText, Validierung

Space Detail

Space-Daten + Buchungsformular

Dashboard (User)

Liste eigener Buchungen (DataTable)

Dashboard (Admin)

Space-Verwaltung (DataTable, Dialog)

7. Nicht-funktionale Anforderungen

Responsives Design (Mobile/Desktop)

Fehlerbehandlung auf API- & UI-Ebene

Sichere Authentifizierung

Trennung von Frontend/Backend via REST-API

8. Optional Features

Echtzeitverfügbarkeit (via Socket.io)

Bewertungen/Kommentare

E-Mail-Benachrichtigung bei Buchung

