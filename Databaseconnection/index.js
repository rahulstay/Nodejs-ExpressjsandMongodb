// const express = require("express");
// const mongoose = require("mongoose");
// const path = require("path");

// const app = express();

// // Set EJS view engine
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// const connectDB = () => {
//   mongoose
//     .connect("mongodb://127.0.0.1:27017/newdatabase")
//     .then(() => console.log("Database Connected."))
//     .catch((err) => console.log("Database Failed.", err));
// };

// connectDB();

// // Schema
// const contactSchema = new mongoose.Schema({
//   first_name: String,
//   last_name: String,
//   email: String,
//   phone: String,
//   address: String,
// });

// // Model
// const Contact = mongoose.model("Contact", contactSchema);

// // Dummy Data Insert
// async function addDummyData() {
//   try {
//     await Contact.insertMany([
//       {
//         first_name: "Rahul",
//         last_name: "Sharma",
//         email: "rahul@example.com",
//         phone: "9876543210",
//         address: "Mumbai, Maharashtra",
//       },
//       {
//         first_name: "Aman",
//         last_name: "Verma",
//         email: "aman@example.com",
//         phone: "9123456780",
//         address: "Delhi, India",
//       },
//       {
//         first_name: "Priya",
//         last_name: "Khan",
//         email: "priya@example.com",
//         phone: "9988776655",
//         address: "Pune, Maharashtra",
//       },
//     ]);

//     console.log("Dummy Data Inserted");
//   } catch (error) {
//     console.log("Insert Failed", error);
//   }
// }

// // Run once
// //addDummyData();

// // Home route → render frontend
// app.get("/", async (req, res) => {
//   const contacts = await Contact.find();
//   res.render("index", { contacts });
//   console.log(contacts)
// });

// app.listen(3000, () => {
//   console.log("server is running on port 3000");
// });
require("dotenv").config(); //must be add on the top  of server file
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");

const app = express();

const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Set EJS
app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "views")); //“When I render a view, look for the template files inside the views folder located in the current project directory.”

// DB connection
mongoose
  .connect(process.env.MONGO_URI) //do not use ""
  .then(() => console.log("Database Connected."))
  .catch((err) => console.log(err));

// Schema
const contactSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  address: String,
});

// Model
const Contact = mongoose.model("Contact", contactSchema);

// ROUTES

// HOME - SHOW ALL CONTACTS
app.get("/", async (req, res) => {
  const contacts = await Contact.find();
  res.render("index", { contacts });
});

// SHOW FORM TO ADD CONTACT
app.get("/add", (req, res) => {
  res.render("add");
});

// CREATE CONTACT
app.post("/add", async (req, res) => {
  await Contact.create(req.body);
  console.log(req.body)
  res.redirect("/");
});

// SHOW EDIT FORM
app.get("/edit/:id", async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render("edit", { contact });
});

// UPDATE CONTACT
app.put("/edit/:id", async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
});

// DELETE CONTACT
app.delete("/delete/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// SERVER
app.listen(PORT, () => {
  console.log("Server running on port 3000");
});
