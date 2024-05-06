import express from "express";
import fs from "node:fs/promises";

const menuRouter = express.Router();

menuRouter.get("/meals", async (req, res) => {
  const meals = await fs.readFile("./data/available-meals.json", "utf8");
  res.json(JSON.parse(meals));
});

export default menuRouter;
