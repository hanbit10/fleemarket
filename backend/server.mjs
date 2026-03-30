import dotenv from "dotenv";
dotenv.config();
const { PORT, MONGODB_URI } = process.env;
import app from "./app.mjs";
import mongoose from "mongoose";
import express from "express";

const port = PORT;

app.get("/", (req, res) => {
  res.json({ message: "Hello from Server!" });
});

app.get("/test", (req, res) => {
  res.json({ status: "Backend ist erreichbar!" });
});

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
