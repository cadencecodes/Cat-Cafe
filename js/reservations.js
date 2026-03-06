// Reservations CRUD — data persisted as an array under a single localStorage key.
// Depends on: storage.js (must be loaded first)

const RESERVATIONS_KEY = "purrfect_reservations";

// Returns all reservations sorted by date then time (soonest first).
function getReservations() {
  const data = storage.get(RESERVATIONS_KEY);
  return data.sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    return dateCompare !== 0 ? dateCompare : a.time.localeCompare(b.time);
  });
}

// Adds a new reservation. Generates a unique ID and createdAt timestamp.
// reservationObj must include: name, email, date, time, guests, notes
// Returns the updated reservations array.
function addReservation(reservationObj) {
  const reservations = getReservations();

  const newReservation = {
    id: "res_" + Date.now(),
    name: reservationObj.name?.trim() || "",
    email: reservationObj.email?.trim() || "",
    date: reservationObj.date || "",
    time: reservationObj.time || "",
    guests: Number(reservationObj.guests) || 1,
    notes: reservationObj.notes?.trim() || "",
    createdAt: new Date().toISOString(),
  };

  reservations.push(newReservation);
  storage.set(RESERVATIONS_KEY, reservations);
  return reservations;
}

// Updates an existing reservation by ID. Only the fields provided in updatedData
// are changed — all other fields are preserved.
// Returns the updated reservations array, or null if the ID was not found.
function updateReservation(reservationId, updatedData) {
  const reservations = getReservations();
  const index = reservations.findIndex((r) => r.id === reservationId);

  if (index === -1) {
    console.warn(`updateReservation: no reservation found with id "${reservationId}"`);
    return null;
  }

  reservations[index] = {
    ...reservations[index],
    name: updatedData.name?.trim() ?? reservations[index].name,
    email: updatedData.email?.trim() ?? reservations[index].email,
    date: updatedData.date ?? reservations[index].date,
    time: updatedData.time ?? reservations[index].time,
    guests: updatedData.guests !== undefined ? Number(updatedData.guests) : reservations[index].guests,
    notes: updatedData.notes?.trim() ?? reservations[index].notes,
  };

  storage.set(RESERVATIONS_KEY, reservations);
  return reservations;
}

// Removes a reservation by ID.
// Returns the updated reservations array, or null if the ID was not found.
function deleteReservation(reservationId) {
  const reservations = getReservations();
  const filtered = reservations.filter((r) => r.id !== reservationId);

  if (filtered.length === reservations.length) {
    console.warn(`deleteReservation: no reservation found with id "${reservationId}"`);
    return null;
  }

  storage.set(RESERVATIONS_KEY, filtered);
  return filtered;
}
