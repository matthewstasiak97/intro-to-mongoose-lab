import dotenv from "dotenv";
dotenv.config();
import promptSync from "prompt-sync";
import Customer from "./models/Customer.js";
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log(" Connected to MongoDB!");
    await startApp();
  })
  .catch((err) => {
    console.error(" Failed to connect to MongoDB:", err.message);
  });

const prompt = promptSync();

async function startApp() {
  let running = true;

  while (running) {
    console.log(`
Welcome to the CRM!

What would you like to do?

  1. Create a customer
  2. View all customers
  3. Update a customer
  4. Delete a customer
  5. Quit
    `);

    const choice = prompt("Enter a number: ");

    if (choice === "1") {
      await createCustomer();
    } else if (choice === "2") {
      await viewCustomers();
    } else if (choice === "3") {
      await updateCustomer();
    } else if (choice === "4") {
      await deleteCustomer();
    } else if (choice === "5") {
      console.log(" Exiting...");
      running = false;
    } else {
      console.log(" That is not a valid choice.");
    }
  }

  mongoose.connection.close();
}

async function createCustomer() {
  const name = prompt("Enter the customer name: ");
  const age = parseInt(prompt("Enter the customer age: "), 10);

  await Customer.create({ name, age });

  console.log(" Customer created!\n");
}

async function viewCustomers() {
  const customers = await Customer.find();

  console.log("\n Customers:");
  customers.forEach((customer) => {
    console.log(
      `id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`
    );
  });

  console.log("");
}

async function updateCustomer() {
  const customers = await Customer.find();

  console.log("\n Customers:");
  customers.forEach((customer) => {
    console.log(
      `id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`
    );
  });

  const id = prompt("\nEnter the ID of the customer to update: ");
  const name = prompt("Enter the new name: ");
  const age = parseInt(prompt("Enter the new age: "), 10);

  await Customer.findByIdAndUpdate(id, { name, age });

  console.log("Customer updated!\n");
}

async function deleteCustomer() {
  const customers = await Customer.find();

  console.log("\n Customers:");
  customers.forEach((customer) => {
    console.log(
      `id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`
    );
  });

  const id = prompt("\nEnter the ID of the customer to delete: ");

  await Customer.findByIdAndDelete(id);

  console.log("Customer deleted!\n");
}
