//non primitive data types 

person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
address:
    {
        street: "123 Main St",
        city: "Anytown",
        state: "FL"
    }
};

console.log(person);
console.log(person.firstName); // "John"


person.email = "gabriel.miami.edu"; //adding new property to object

console.log(person); // "gabriel.miami.edu"


let person2 = {};

person2.firstName = "Jane";
person2.lastName = "Smith";
person2.age = 25;

console.log(person2);