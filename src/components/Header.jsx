import styles from "./Header.module.css";
import brand from "/brand.png";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import { useContext } from "react";

const Header = () => {
  const ctx = useContext(CartContext);

  const totalCartItems = ctx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  return (
    <header className={styles["header"]}>
      <div className={styles["header__title"]}>
        <img src={brand} alt="Anna's" />
        <h1>Anna's Kitchen</h1>
      </div>

      <nav>
        <Button textOnly>Cart ({totalCartItems})</Button>
        <Button textOnly>Login</Button>
      </nav>
    </header>
  );
};

export default Header;
