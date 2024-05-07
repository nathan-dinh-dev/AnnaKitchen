import { useContext, useEffect, useState } from "react";
import TransactionItem from "./TransactionItem";
import styles from "./Transactions.module.css";
import axios from "axios";
import AccountContext from "../../store/AccountContext";

const Transactions = () => {
  const accountCtx = useContext(AccountContext);
  const [transArr, setTransArr] = useState([]);

  axios
    .get("http://localhost:5000/my-transactions", {
      params: {
        userID: accountCtx.user.uid,
      },
    })
    .then((response) => {
      console.log(response);
      setTransArr([...response.data.data]);
    })
    .catch((error) => console.log(error.message));

  return (
    <>
      <div className={styles.title}>
        <h1>Order History</h1>
      </div>

      <table>
        <tr>
          <th>Transaction ID</th>
          <th>Total</th>
          <th>Date & Time</th>
        </tr>
        {transArr.map((trans) => (
          <TransactionItem
            transID={trans.TransactionID}
            date={trans.Date}
            total={trans.Total}
          />
        ))}
      </table>
    </>
  );
};

export default Transactions;
