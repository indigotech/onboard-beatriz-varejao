const next = ['Next 1', 'Next 2', 'Next 3', 'Next 4', 'Next 5'];
const resultNext = listItems(next, 1, 2);
const resultNext2 = listItems(next, 2, 2);
const resultNext3 = listItems(next, 3, 2);
console.log(resultNext, resultNext2, resultNext3);

export function listItems(items, pageActual, limitItems) {
  const result = [];
  const totalPage = Math.ceil(items.length / limitItems);
  let count = pageActual * limitItems - limitItems;
  const delimiter = count + limitItems;
  if (pageActual <= totalPage) {
    for (let i = count; i < delimiter; i++) {
      if (items[i] != null) {
        result.push(items[i]);
      }
      count++;
    }
  }
  return result;
}
