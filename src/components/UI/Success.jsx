import styles from "./Success.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import brand from "/brand.png";
import Header from "../Header/Header";

const Success = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className={styles.success}>
        <div className={styles.card}>
          <img src={brand} alt="" />
          <h2>Payment Successful</h2>
          <p>Thank You For Placing Order With Anna's Kitchen!</p>
          <Button onClick={() => navigate("/")}>Continue Shopping</Button>
        </div>
      </div>
    </>
  );
};
export default Success;
