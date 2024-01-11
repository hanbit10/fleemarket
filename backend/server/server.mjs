import dotenv from "dotenv";
dotenv.config();
const { PORT, MONGODB_URI } = process.env;
import app from "./app.mjs";
import mongoose from "mongoose";
import express from "express";

const port = PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Hello from Server!" });
});

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit;
  });

app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(__dirname + "../public/index.html");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
