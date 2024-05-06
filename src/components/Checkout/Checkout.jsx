import { useContext, useState } from "react";
import Modal from "../UI/Modal.jsx";
import CartContext from "../../store/CartContext";
import { currencyFormatter } from "../../util/formatting";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";
import UserProgressContext from "../../store/UserProgressContext.jsx";
import styles from "./Checkout.module.css";
import axios from "axios";
import { toast } from "react-toastify";

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

  const submitHandler = async (event) => {
    event.preventDefault();
    const id = toast.loading("Sending Order...");
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    try {
      const url = "http://localhost:5000/order-confirmed";
      const data = {
        order: {
          customer: customerData,
          transaction: cartTotal,
          items: ctx.items,
          total: cartTotal,
        },
      };
      // Specifying headers in the config object
      const config = { "content-type": "application/json" };

      const response = await axios.post(url, data, config);
      console.log(response.data);

      if (response.status === 200) {
        toast.update(id, {
          render: "Order Confirmed!",
          type: "success",
          isLoading: false,
          autoClose: 800,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
        });

        userProgressCtx.hideCheckout();
        ctx.removeAllItem();
      }
    } catch (error) {
      toast.update(id, {
        render: "Failed to Order!",
        type: "error",
        isLoading: false,
        autoClose: 800,
        closeOnClick: true,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
      });
      console.log(error);
    }
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
        <Input label="Full Name" type="text" id="name" required />
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
            <Input label="Street" type="text" id="street" required />
            <div className={styles["checkout__row"]}>
              <Input
                label="Postal Code"
                type="text"
                id="postal-code"
                required
              />
              <Input label="City" type="text" id="city" required />
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
