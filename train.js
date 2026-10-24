// TASK - X

function countOccurrences(obj, key) {
  let count = 0;

  for (const k in obj) {
    if (k === key) count++;

    if (typeof obj[k] === "object" && obj[k] !== null) {
      count += countOccurrences(obj[k], key);
    }
  }

  return count;
}

console.log(
  countOccurrences(
    { name: "Ali", pet: { name: "Rex", age: 3 }, car: { brand: "BMW", owner: { name: "Vali" } } },
    "name"
  )
); // 3

//  yarn train