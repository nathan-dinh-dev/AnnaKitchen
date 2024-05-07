import { useContext, useEffect, useState } from "react";
import TransactionItem from "./TransactionItem";
import styles from "./Transactions.module.css";
import axios from "axios";
import AccountContext from "../../store/AccountContext";

const Transactions = () => {
  const accountCtx = useContext(AccountContext);
  const [transArr, setTransArr] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const transactions = await axios.get(
          "http://localhost:5000/my-transactions",
          {
            params: {
              userID: accountCtx.user.uid,
            },
          }
        );
        setTransArr(transactions.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTransactions();
  }, []);

  return (
    <div className={styles.transactions}>
      <div className={styles["transaction-container-dimension-adjust"]}>
        <div className={styles.title}>
          <h1>Order History</h1>
        </div>

        <table className={styles["transaction-table"]}>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Total</th>
              <th>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {transArr.map((trans, id) => (
              <TransactionItem
                key={id}
                transID={trans.TransactionID}
                date={trans.Date}
                total={trans.Total}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
