// MongoDB CRUD Coursework
// Student: Yu-Chi Huang
// Student number: 3775879
// Course: CT70A9140 Software Development Skills: Full-Stack 2025-26

// Select the coursework database.
const courseworkDB = db.getSiblingDB("expense_tracker_coursework");

// Reset the collection so the exercise can be run repeatedly.
courseworkDB.transactions.drop();

print("=== CREATE: Insert sample transactions ===");
const insertResult = courseworkDB.transactions.insertMany([
  {
    description: "Lunch",
    amount: 12.5,
    type: "expense",
    category: "Food",
    date: new Date("2026-07-16"),
    note: "Lunch near the university"
  },
  {
    description: "Bus ticket",
    amount: 3.2,
    type: "expense",
    category: "Transport",
    date: new Date("2026-07-16"),
    note: "Bus to campus"
  },
  {
    description: "Part-time salary",
    amount: 1200,
    type: "income",
    category: "Salary",
    date: new Date("2026-07-15"),
    note: "Monthly part-time salary"
  }
]);
printjson(insertResult);

print("\n=== READ: Display every transaction ===");
courseworkDB.transactions.find({}).forEach((transaction) => printjson(transaction));

print("\n=== READ: Display expense transactions ===");
courseworkDB.transactions
  .find({ type: "expense" })
  .forEach((transaction) => printjson(transaction));

print("\n=== UPDATE: Change the Lunch transaction ===");
const updateResult = courseworkDB.transactions.updateOne(
  { description: "Lunch" },
  {
    $set: {
      amount: 15.5,
      note: "Lunch with a classmate"
    }
  }
);
printjson(updateResult);

print("\n=== DELETE: Remove the Bus ticket transaction ===");
const deleteResult = courseworkDB.transactions.deleteOne({
  description: "Bus ticket"
});
printjson(deleteResult);

print("\n=== FINAL RESULT ===");
courseworkDB.transactions.find({}).forEach((transaction) => printjson(transaction));

