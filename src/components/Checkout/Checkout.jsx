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
import AccountContext from "../../store/AccountContext.jsx";
import { loadStripe } from "@stripe/stripe-js";

const Checkout = () => {
  const ctx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const accountCtx = useContext(AccountContext);

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

    let customerData;

    if (accountCtx.user) {
      customerData = {
        id: accountCtx.user.uid,
        name: accountCtx.user.displayName,
        email: accountCtx.user.email,
      };
    } else {
      customerData = Object.fromEntries(fd.entries());
      customerData.id = null;
    }

    try {
      let transID = await axios.get("http://localhost:5000/largest-trans-id");
      const orderConfirmUrl = "http://localhost:5000/order-confirmed";
      const databaseTransactionUrl = "http://localhost:5000/transaction";

      if (!transID.data) {
        transID = 1;
      } else {
        transID = transID.data.data[0].TransactionID + 1;
      }

      const data = {
        order: {
          customer: customerData,
          transaction: transID,
          items: ctx.items,
          total: cartTotal,
        },
      };
      // Specifying headers in the config object
      const config = { "content-type": "application/json" };

      const response1 = await axios.post(orderConfirmUrl, data, config);

      const response2 = await axios.post(databaseTransactionUrl, data, config);

      if (response1.status === 200 && response2.status === 200) {
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

    makePayment();
  };

  const orderTypeHandler = (event) => {
    setOrderType(event.target.value);
  };

  const autofilledName = accountCtx.user
    ? { value: accountCtx.user.displayName, disabled: true }
    : "";

  const autofilledEmail = accountCtx.user
    ? { value: accountCtx.user.email, disabled: true }
    : "";

  const makePayment = async () => {
    const apiUrl = "http://localhost:5000/create-checkout-session";
    const stripe = await loadStripe(
      "pk_test_51PCzZ52MTF0cNn53zebZLUYQfDFtumEi3SPO7oRYPDluSmUnAOqKlSnzuaR3AXkktErlHGND8awWjYrl0hgaS6jV00neTLxD10"
    );

    const body = {
      products: ctx.items,
    };

    const config = { "content-type": "application/json" };

    const response = await axios.post(apiUrl, body, config);

    const result = stripe.redirectToCheckout({
      sessionId: response.data.id,
    });

    console.log(result);
  };

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={closeHandler}
    >
      <form action="" onSubmit={submitHandler}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input
          label="Full Name"
          type="text"
          id="name"
          required
          {...autofilledName}
        />

        <Input
          label="Email Address"
          type="email"
          id="email"
          required
          {...autofilledEmail}
        />

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
