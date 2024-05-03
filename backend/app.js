import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/meals", async (req, res) => {
  const meals = await fs.readFile(
    "./backend/data/available-meals.json",
    "utf8"
  );
  res.json(JSON.parse(meals));
});

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

app.listen(PORT, (err) => {
  if (err) console.log("Error in server setup");
  console.log("Server starting on Port:", PORT);
});
