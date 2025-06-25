# Raumzeit – Co-Working Space Booking App

**Technologien:** Node.js · Express.js · MongoDB · Vue.js · PrimeVue v4

## 🚀 Projektziel

Webanwendung zur Buchung von Co-Working-Spaces. Nutzer können Spaces durchsuchen und buchen, Admins können sie verwalten. Fokus liegt auf Backend-Kompetenz und REST-Architektur.

---

## 🛠️ Tech Stack

| Ebene       | Technologie                     |
|-------------|----------------------------------|
| Frontend    | Vue.js 3, PrimeVue v4, Pinia, Vue Router |
| Backend     | Node.js, Express.js             |
| Datenbank   | MongoDB (Mongoose ODM)          |
| Authentifizierung | JWT, bcrypt               |
| UI/Styling  | PrimeVue, PrimeFlex             |

---

## 👤 Benutzerrollen

- **User**: Registrierung, Login, Spaces suchen & buchen, Buchungen verwalten  
- **Admin**: Zusätzlich: Spaces anlegen, bearbeiten, löschen, Buchungen einsehen

---

## 📦 Kernfunktionen

### Benutzerverwaltung
- Authentifizierung mit JWT
- Passwort-Hashing mit bcrypt
- Rollenbasiertes Routing

### Space Management
- CRUD-API für Co-Working-Spaces
- Eigenschaften: Name, Ort, Ausstattung, Bild, Preis, Verfügbarkeit

### Buchungssystem
- Datum/Zeit-Auswahl
- Prüfung auf Überschneidungen
- Preisberechnung pro Stunde
- Buchungshistorie anzeigen & stornieren

---

## 📡 REST-API-Endpunkte (Auszug)

```http
POST   /api/register        // Registrierung
POST   /api/login           // Login
GET    /api/spaces          // Alle Spaces
GET    /api/spaces/:id      // Details anzeigen
POST   /api/spaces          // (Admin) Space anlegen
POST   /api/bookings        // Space buchen
GET    /api/bookings        // Eigene Buchungen anzeigen
