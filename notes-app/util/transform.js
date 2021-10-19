export const transformObject = (obj) => {
  return Object.keys(obj)
    .reverse()
    .map((key) => ({
      ...obj[key],
      id: key,
    }));
};
