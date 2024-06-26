import express from "express";
import fs from "node:fs/promises";

const jsonMenuRouter = express.Router();

jsonMenuRouter.get("/meals", async (req, res) => {
  // const meals = await fs.readFile("./data/available-meals.json", "utf8");
  const meals = await fs.readFile("./data/menu.json", "utf8");
  res.json(JSON.parse(meals));
});

export default jsonMenuRouter;
