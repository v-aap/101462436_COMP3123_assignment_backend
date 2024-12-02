const mongoose = require("mongoose");
const Employee = require("./models/employee"); // Import the Employee model

const dummyData = [
  {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    position: "Software Engineer",
    salary: 60000,
    date_of_joining: "2021-01-15",
    department: "Engineering",
  },
  {
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    position: "Product Manager",
    salary: 80000,
    date_of_joining: "2020-07-10",
    department: "Product",
  },
  {
    first_name: "Emily",
    last_name: "Johnson",
    email: "emily.johnson@example.com",
    position: "HR Manager",
    salary: 70000,
    date_of_joining: "2019-03-22",
    department: "Human Resources",
  },
];

// Database connection
const MONGO_URI = "mongodb://mongo:27017/comp3123_assignment2"; // Update as needed

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Function to seed data
const seedData = async () => {
  try {
    // Clear existing data
    await Employee.deleteMany({});
    console.log("Cleared existing employees");

    // Insert dummy data
    await Employee.insertMany(dummyData);
    console.log("Dummy data inserted");

    // Disconnect from database
    mongoose.connection.close();
    console.log("Database connection closed");
  } catch (err) {
    console.error("Error seeding data:", err);
    mongoose.connection.close();
  }
};

seedData();
