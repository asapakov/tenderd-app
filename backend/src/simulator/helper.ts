export function generateRandomLatitudeUAE() {
  // Latitude range for UAE: Approximately 22.5° N to 26.5° N
  return 22.5 + Math.random() * (26.5 - 22.5);
}

export function generateRandomLongitudeUAE() {
  // Longitude range for UAE: Approximately 51° E to 56° E
  return 51 + Math.random() * (56 - 51);
}
