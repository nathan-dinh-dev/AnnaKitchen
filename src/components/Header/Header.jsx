import styles from "./Header.module.css";
import brand from "/brand.png";
import Button from "../UI/Button.jsx";
import CartContext from "../../store/CartContext.jsx";
import { useContext, useState } from "react";
import UserProgressContext from "../../store/UserProgressContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import AccountContext from "../../store/AccountContext.jsx";

const Header = () => {
  const naivigate = useNavigate();
  const ctx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const accountCtx = useContext(AccountContext);

  const [isDropdown, setIsDropdown] = useState(false);

  const totalCartItems = ctx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  const showCartHandler = () => {
    userProgressCtx.showCart();
  };

  const logoutHandler = () => {
    accountCtx.processDataInput(null, "logout");
  };

  let buttonDisplayName;

  if (accountCtx.user) {
    let name = accountCtx.user.displayName;
    if (name.includes(" ")) {
      name = name.split(" ")[0];
    }
    buttonDisplayName = (
      <div
        className={styles["header-button-name-display"]}
        onMouseEnter={() => setIsDropdown(true)}
        onMouseLeave={() => setIsDropdown(false)}
      >
        <Button textOnly>Hi, {name}</Button>

        <div
          className={
            isDropdown
              ? `${styles["dropdown-content"]} ${styles.show}`
              : styles["dropdown-content"]
          }
        >
          <Button textOnly type="button" onClick={logoutHandler}>
            History Order
          </Button>
        </div>

        <div
          className={
            isDropdown
              ? `${styles["dropdown-content"]} ${styles.show}`
              : styles["dropdown-content"]
          }
        >
          <Button textOnly type="button" onClick={logoutHandler}>
            Log Out
          </Button>
        </div>
      </div>
    );
  }
  return (
    <header className={styles["header"]}>
      <div className={styles["header__title"]} onClick={() => naivigate("/")}>
        <img src={brand} alt="Anna's" />
        <h1>Anna's Kitchen</h1>
      </div>

      <nav>
        <Button textOnly onClick={showCartHandler}>
          Cart ({totalCartItems})
        </Button>
        {accountCtx.user ? (
          buttonDisplayName
        ) : (
          <Link to="/login">
            <Button textOnly>Account</Button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
