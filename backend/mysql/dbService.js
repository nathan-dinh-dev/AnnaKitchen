import config from "./dbConfig.js";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection(config.db);

class DbService {
  static instance = null;

  static getDbServiceInstance() {
    return this.instance ? this.instance : new DbService();
  }

  // GET method
  async getAllData(tableName) {
    try {
      if (tableName === "menu") {
        const [results, fields] = await connection.query(
          "SELECT * FROM `menu`"
        );
        return results;
      } else if (tableName === "receipt") {
        const [results, fields] = await connection.query(
          "SELECT * FROM `receipt`"
        );
        return results;
      } else if (tableName === "transaction") {
        const [results, fields] = await connection.query(
          "SELECT * FROM `transaction`"
        );
        return results;
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  async getLargestTransactionNumber() {
    try {
      const [results, fields] = await connection.query(
        "SELECT `TransactionID` FROM `transaction` ORDER BY `TransactionID` DESC LIMIT 1"
      );
      return results;
    } catch (err) {
      console.log(err.message);
    }
  }

  async getMyTransactions(userID) {
    try {
      const [results, fields] = await connection.query(
        "SELECT * FROM `transaction` WHERE `UserID` = ?",
        [userID]
      );
      return results;
    } catch (err) {
      console.log(err.message);
    }
  }

  // POST method
  async insertNewTransaction(transactionID, userID, date, total) {
    try {
      const query =
        "INSERT INTO `transaction` (`TransactionID`, `UserID`, `Date`, `Total`) VALUES (?, ?, ?, ?)";
      const [results, fields] = await connection.query(query, [
        transactionID,
        userID,
        date,
        total,
      ]);
      return results;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default DbService;
