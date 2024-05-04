import Modal from "../UI/Modal.jsx";
import styles from "./Cart.module.css";
import CartContext from "../../store/CartContext.jsx";
import { useContext } from "react";
import { currencyFormatter } from "../../util/formatting";
import Button from "../UI/Button.jsx";
import UserProgressContext from "../../store/UserProgressContext.jsx";

const Cart = () => {
  const ctx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = ctx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const closeCartHandler = () => {
    userProgressCtx.hideCart();
  };

  return (
    <Modal className={styles.cart} open={userProgressCtx.progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {ctx.items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>
      <p className={styles["cart__total"]}>
        {currencyFormatter.format(cartTotal)}
      </p>
      <p className={styles["cart__actions"]}>
        <Button textOnly onClick={closeCartHandler}>
          Close
        </Button>
        <Button>Go To Checkout</Button>
      </p>
    </Modal>
  );
};

export default Cart;
