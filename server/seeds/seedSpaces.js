/**
 * seedSpaces.js
 *
 * Erstellt 50 Test-Dokumente in der Collection "spaces"
 * - Löscht alte Einträge, außer die mit creatorId = '68d0f2d82b61a10781daf037'
 * - Fügt neue Testdaten ein mit Bildern aus /space_test_images
 */

import { MongoClient } from "mongodb";

const MONGO_URI = "mongodb://localhost:27017";
const DB_NAME = "deskly";

// ✅ creatorId, die NICHT gelöscht werden soll
const PROTECTED_CREATOR_ID = "68d0f2d82b61a10781daf037";

const imagesMetaBase = [
  {
    imageName: "4da42018-17e9-4ed9-99d5-98d0d247590d.jpg",
    imagePath: "/space_test_images/4da42018-17e9-4ed9-99d5-98d0d247590d.jpg",
  },
  {
    imageName: "6c54c534-bd12-493b-bfdc-a60b8b35e21b.jpg",
    imagePath: "/space_test_images/6c54c534-bd12-493b-bfdc-a60b8b35e21b.jpg",
  },
  {
    imageName: "d2565f47-4ce4-4f6d-a39c-8dd371d1fb9a.jpg",
    imagePath: "/space_test_images/d2565f47-4ce4-4f6d-a39c-8dd371d1fb9a.jpg",
  },
  {
    imageName: "28e4b596-3e0b-4a2f-8038-cedfaa9ed1fe.jpg",
    imagePath: "/space_test_images/28e4b596-3e0b-4a2f-8038-cedfaa9ed1fe.jpg",
  },
  {
    imageName: "37a32084-e1cb-4378-944b-b8d7b534f150.jpg",
    imagePath: "/space_test_images/37a32084-e1cb-4378-944b-b8d7b534f150.jpg",
  },
];

// --- Hilfsfunktionen ---
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomAmenities() {
  const all = [
    { id: "event_area", label: "Event Area" },
    { id: "coffee", label: "Coffee" },
    { id: "free_water", label: "Free Water" },
    { id: "lockers", label: "Lockers" },
    { id: "wifi", label: "Wi-Fi" },
    { id: "printer", label: "Printer" },
    { id: "meeting_room", label: "Meeting Room" },
  ];
  return all.filter(() => Math.random() > 0.5);
}

function randomImagesMeta() {
  const shuffled = [...imagesMetaBase]
    .sort(() => Math.random() - 0.5)
    .map((img, index) => ({
      ...img,
      order: index + 1,
      isCover: index === 0,
    }));
  return shuffled;
}

function randomName() {
  const first = [
    "Thomas",
    "Anna",
    "Lukas",
    "Sarah",
    "David",
    "Julia",
    "Jonas",
    "Nina",
    "Markus",
    "Lea",
  ];
  const last = [
    "Hof",
    "Keller",
    "Becker",
    "Maier",
    "Schmidt",
    "Wolf",
    "Brandt",
    "Weber",
    "Fischer",
    "Lang",
  ];
  return `${randomChoice(first)} ${randomChoice(last)}`;
}

function randomAddress() {
  const streets = [
    "Hauptstraße",
    "Am Trift",
    "Bergweg",
    "Marktplatz",
    "Sonnenallee",
    "Poststraße",
    "Wiesenweg",
  ];
  const nr = Math.floor(Math.random() * 100) + 1;
  return `${randomChoice(streets)} ${nr}`;
}

function generateDocs(count = 50) {
  const docs = [];
  for (let i = 0; i < count; i++) {
    docs.push({
      name: randomName(),
      description: `Beschreibung für Space #${i + 1}`,
      address: randomAddress(),
      capacity: Math.floor(Math.random() * 20) + 2,
      amenities: randomAmenities(),
      hourlyRate: parseFloat((Math.random() * 10 + 3).toFixed(2)),
      imagesMeta: randomImagesMeta(),
      creatorId: `test_creator_${i + 1}`,
      createdAt: new Date(),
    });
  }
  return docs;
}

// --- Seeder ---
async function seed() {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const spaces = db.collection("spaces");

    // 🧹 Lösche alte Daten, aber NICHT die geschützten
    const deleteResult = await spaces.deleteMany({
      creatorId: { $ne: PROTECTED_CREATOR_ID },
    });
    console.log(`🗑️ ${deleteResult.deletedCount} alte Dokumente gelöscht.`);

    // 🆕 Neue Testdaten einfügen
    const newDocs = generateDocs(50);
    const insertResult = await spaces.insertMany(newDocs);
    console.log(`✅ ${insertResult.insertedCount} neue Test-Spaces eingefügt.`);
  } catch (err) {
    console.error("❌ Fehler beim Seed:", err);
  } finally {
    await client.close();
  }
}

seed();
