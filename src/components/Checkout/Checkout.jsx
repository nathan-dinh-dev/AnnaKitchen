import { useContext } from "react";
import Modal from "../UI/Modal.jsx";
import CartContext from "../../store/CartContext";
import { currencyFormatter } from "../../util/formatting";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";
import UserProgressContext from "../../store/UserProgressContext.jsx";
import styles from "./Checkout.module.css";

const Checkout = () => {
  const ctx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = ctx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const closeHandler = () => {
    userProgressCtx.hideCheckout();
  };

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={closeHandler}
    >
      <form action="">
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="full-name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className={styles["checkout__row"]}>
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        <p className={styles["checkout__actions"]}>
          <Button textOnly onClick={closeHandler} type="button">
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
};

export default Checkout;
