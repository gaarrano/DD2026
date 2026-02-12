let fruits = ["Apple", "Banana", "Cherry"];

console.log(fruits); // ["Apple", "Banana", "Cherry"]


console.log(fruits[0]); // "Apple"


//modifying array
fruits[1] = "Blueberry";

console.log(fruits); // ["Apple", "Blueberry", "Cherry"]

// pushing new element to array
fruits.push("Mango");

console.log(fruits); // ["Apple", "Blueberry", "Cherry", "Mango"]   

// popping last element from array
let lastFruit = fruits.pop();

console.log(lastFruit); // "Mango"
console.log(fruits); // ["Apple", "Blueberry", "Cherry"]

// array length
console.log(fruits.length); // 3