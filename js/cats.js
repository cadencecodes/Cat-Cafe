// Cat Manager CRUD — persisted as an array under a single localStorage key.
// Depends on: storage.js (must be loaded first)

const CATS_KEY = "purrfect_cats";

// Seed data shown when localStorage has no cats yet.
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

// Returns all cats. Seeds defaults into localStorage if the key is empty.
function getCats() {
  const cats = storage.get(CATS_KEY);
  if (cats.length === 0) {
    storage.set(CATS_KEY, DEFAULT_CATS);
    return DEFAULT_CATS;
  }
  return cats;
}

// Adds a new cat profile with a generated unique ID.
// cat must include: name, breed, age, personality, photo, adopted
// Returns the updated cats array.
function addCat(cat) {
  const cats = getCats();

  const newCat = {
    id:          "cat_" + Date.now(),
    name:        cat.name?.trim() || "",
    breed:       cat.breed?.trim() || "",
    age:         Number(cat.age) || 0,
    personality: cat.personality?.trim() || "",
    photo:       cat.photo?.trim() || "",
    adopted:     Boolean(cat.adopted),
  };

  cats.push(newCat);
  storage.set(CATS_KEY, cats);
  return cats;
}

// Updates an existing cat by ID. Only fields provided in data are changed.
// Returns the updated cats array, or null if the ID was not found.
function updateCat(id, data) {
  const cats = getCats();
  const index = cats.findIndex((c) => c.id === id);

  if (index === -1) {
    console.warn(`updateCat: no cat found with id "${id}"`);
    return null;
  }

  cats[index] = {
    ...cats[index],
    name:        data.name?.trim()        ?? cats[index].name,
    breed:       data.breed?.trim()       ?? cats[index].breed,
    age:         data.age !== undefined   ? Number(data.age) : cats[index].age,
    personality: data.personality?.trim() ?? cats[index].personality,
    photo:       data.photo?.trim()       ?? cats[index].photo,
    adopted:     data.adopted !== undefined ? Boolean(data.adopted) : cats[index].adopted,
  };

  storage.set(CATS_KEY, cats);
  return cats;
}

// Removes a cat by ID.
// Returns the updated cats array, or null if the ID was not found.
function deleteCat(id) {
  const cats = getCats();
  const filtered = cats.filter((c) => c.id !== id);

  if (filtered.length === cats.length) {
    console.warn(`deleteCat: no cat found with id "${id}"`);
    return null;
  }

  storage.set(CATS_KEY, filtered);
  return filtered;
}
