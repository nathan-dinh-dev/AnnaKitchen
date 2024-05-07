import styles from "./TransactionItem.module.css";

const TransactionItem = ({ transID, date, total }) => {
  return (
    <tr>
      <td>{transID}</td>
      <td>${total}</td>
      <td>{date}</td>
    </tr>
  );
};

export default TransactionItem;
