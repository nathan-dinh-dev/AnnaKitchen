import { currencyFormatter } from "../../util/formatting";
import styles from "./CartItem.module.css";

const CartItem = ({ item, onDecrease, onIncrease }) => {
  return (
    <li className={styles["cart-item"]}>
      <p>
        {item.name} - {item.quantity} x {currencyFormatter.format(item.price)}
      </p>

      <p className={styles["cart-item__actions"]}>
        <button onClick={onDecrease}>-</button>
        <span>{item.quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
};

export default CartItem;
