import bodyParser from "body-parser";
import express from "express";
import jsonMenuRouter from "./route/jsonMenuRoute.js";
import orderConfirmedRouter from "./route/orderConfirmedRoute.js";
import cors from "cors";
import mysqlRouter from "./route/mysqlRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/", jsonMenuRouter);
app.use("/", orderConfirmedRouter);
app.use("/", mysqlRouter);

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
