import promptSync from "prompt-sync";
import Customers from "./models/Customer.js";

const prompt = promptSync();

console.log(`
    Welcome to the CRM

    What would you like to do?

  1. Create a customer
  2. View all customers
  3. Update a customer
  4. Delete a customer
  5. quit
`);

const userInput = prompt("Number of action to run: ");
console.log(userInput);

const updateUser = async (name, age) => {
  const id = "658226acdcbecfe9b99d5421";
  const updateUser = await Customers.findByIdAndUpdate(
    id,
    { name: Bilbo },
    { age: 50 }
  );
  console.log("Updated user:", updateUser);
};
