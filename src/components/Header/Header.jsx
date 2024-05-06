import styles from "./Header.module.css";
import brand from "/brand.png";
import Button from "../UI/Button.jsx";
import CartContext from "../../store/CartContext.jsx";
import { useContext } from "react";
import UserProgressContext from "../../store/UserProgressContext.jsx";

const Header = () => {
  const ctx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = ctx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  const showCartHandler = () => {
    userProgressCtx.showCart();
  };

  return (
    <header className={styles["header"]}>
      <div className={styles["header__title"]}>
        <img src={brand} alt="Anna's" />
        <h1>Anna's Kitchen</h1>
      </div>

      <nav>
        <Button textOnly onClick={showCartHandler}>
          Cart ({totalCartItems})
        </Button>
        <Button textOnly>Login</Button>
      </nav>
    </header>
  );
};

export default Header;
