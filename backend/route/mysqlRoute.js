import express from "express";
import "dotenv/config";
import DbService from "../mysql/dbService.js";

const mysqlRouter = express.Router();

// Create new row in database
mysqlRouter.post("/transaction", (req, res) => {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  const { customer, transaction, items, total } = req.body.order;
  const db = new DbService();

  const result = db.insertNewTransaction(
    transaction,
    customer.id,
    currentDate,
    total
  );

  result
    .then((data) => res.json({ message: "ok", data: data }))
    .catch((err) => console.log(err));
});

// Retrieve data from database
mysqlRouter.get("/menu", (req, res) => {
  const db = new DbService();
  const result = db.getAllData("menu");

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

mysqlRouter.get("/largest-trans-id", (req, res) => {
  const db = new DbService();
  const result = db.getLargestTransactionNumber();

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

mysqlRouter.get("/my-transactions", (req, res) => {
  const db = new DbService();

  const result = db.getAllData("transaction");

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

export default mysqlRouter;
