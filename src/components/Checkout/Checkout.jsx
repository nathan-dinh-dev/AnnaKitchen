import { useContext, useState } from "react";
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
  const [orderType, setOrderType] = useState("pickup");

  const cartTotal = ctx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const closeHandler = () => {
    userProgressCtx.hideCheckout();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
  };

  const orderTypeHandler = (event) => {
    setOrderType(event.target.value);
  };

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={closeHandler}
    >
      <form action="" onSubmit={submitHandler}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="full-name" required />
        <Input label="Email Address" type="email" id="email" required />

        <div className={styles["checkout__type"]}>
          <h3>Order Type</h3>
          <select
            name="order-type"
            id="order-type"
            onChange={orderTypeHandler}
            value={orderType}
          >
            <option value="pickup">In-store pickup</option>
            <option value="delivery">Delivery</option>
          </select>
        </div>
        {orderType === "delivery" ? (
          <>
            <Input label="Street" type="text" id="street" />
            <div className={styles["checkout__row"]}>
              <Input label="Postal Code" type="text" id="postal-code" />
              <Input label="City" type="text" id="city" />
            </div>
          </>
        ) : (
          ""
        )}

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
