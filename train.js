// TASK - Z
function sumEvens(numbers) {
  return numbers
    .filter((number) => number % 2 === 0)
    .reduce((sum, number) => sum + number, 0);
}

console.log(sumEvens([1, 2, 3])); // 2


// TASK - Y

// function findIntersection(arr1, arr2) {
//   return arr1.filter((value) => arr2.includes(value));
// }

// console.log(findIntersection(["apple", "banana", "cherry"], ["cherry", "banana", "grape"]));
// // ["banana", "cherry"]





// TASK - X

// function countOccurrences(obj, key) {
//   let count = 0;

//   for (const k in obj) {
//     if (k === key) count++;

//     if (typeof obj[k] === "object" && obj[k] !== null) {
//       count += countOccurrences(obj[k], key);
//     }
//   }

//   return count;
// }

// console.log(
//   countOccurrences(
//     { name: "Ali", pet: { name: "Rex", age: 3 }, car: { brand: "BMW", owner: { name: "Vali" } } },
//     "name"
//   )
// ); // 3

//  yarn train