export function fetchItem(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: `ITEM NAME with ID: ${id}`
      });
    }, 1500);
  });
}
