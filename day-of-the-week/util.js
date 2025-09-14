function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomDate() {
  const year = random(1950, new Date().getFullYear());
  const month = random(0, 11);
  const day = random(1, 31);

  return new Date(year, month, day);
}
