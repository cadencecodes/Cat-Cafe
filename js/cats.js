// Cat Manager CRUD — persisted in Firestore "cats" collection.
// Depends on: firebase.js (db must be initialized first)

const catsCol = db.collection("cats");

// Seed data written to Firestore when the collection is empty.
const DEFAULT_CATS = [
  {
    id:          "cat_bartlett",
    name:        "Bartlett",
    breed:       "Domestic Shorthair",
    age:         3,
    personality: "Loves chin scratches and napping in sunny spots.",
    photo:       "",
    adopted:     false,
  },
  {
    id:          "cat_anjou",
    name:        "Anjou",
    breed:       "Maine Coon",
    age:         5,
    personality: "A gentle giant who will sit on your laptop.",
    photo:       "",
    adopted:     false,
  },
  {
    id:          "cat_bosc",
    name:        "Bosc",
    breed:       "Tabby",
    age:         1,
    personality: "Playful kitten with a fondness for string toys.",
    photo:       "",
    adopted:     false,
  },
];

// Writes default cats to Firestore if the collection has no documents.
async function seedIfEmpty() {
  const snap = await catsCol.get();
  if (!snap.empty) return;

  const batch = db.batch();
  DEFAULT_CATS.forEach((cat) => {
    const { id, ...data } = cat;
    batch.set(catsCol.doc(id), data);
  });
  await batch.commit();
}

// Adds a new cat. Firestore auto-generates the document ID.
async function addCat(cat) {
  await catsCol.add({
    name:        cat.name?.trim()        || "",
    breed:       cat.breed?.trim()       || "",
    age:         Number(cat.age)         || 0,
    personality: cat.personality?.trim() || "",
    photo:       cat.photo?.trim()       || "",
    adopted:     Boolean(cat.adopted),
  });
}

// Updates an existing cat document by its Firestore document ID.
async function updateCat(id, data) {
  await catsCol.doc(id).update({
    name:        data.name?.trim()        || "",
    breed:       data.breed?.trim()       || "",
    age:         Number(data.age)         || 0,
    personality: data.personality?.trim() || "",
    photo:       data.photo?.trim()       || "",
    adopted:     Boolean(data.adopted),
  });
}

// Deletes a cat document by its Firestore document ID.
async function deleteCat(id) {
  await catsCol.doc(id).delete();
}
