export function createClueId(data) {
  Object.keys(data.across).forEach(n => data.across[n].id = n + "A");
  Object.keys(data.down).forEach(n => data.down[n].id = n + "D");
  return data;
}
