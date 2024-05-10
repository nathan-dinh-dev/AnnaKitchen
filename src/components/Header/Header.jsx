import styles from "./Header.module.css";
import brand from "/brand.png";
import Button from "../UI/Button.jsx";
import CartContext from "../../store/CartContext.jsx";
import { useContext, useState, useEffect } from "react";
import UserProgressContext from "../../store/UserProgressContext.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AccountContext from "../../store/AccountContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const naivigate = useNavigate();
  const location = useLocation().pathname;
  const ctx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const accountCtx = useContext(AccountContext);
  const [isShrinked, setIsShrinked] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const totalCartItems = ctx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  const showCartHandler = () => {
    userProgressCtx.showCart();
  };

  const logoutHandler = () => {
    naivigate("/");
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
          <Button
            textOnly
            type="button"
            onClick={() => naivigate("/my-transactions")}
          >
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

  const scrollFunction = () => {
    setIsShrinked(window.scrollY > 25);
  };

  useEffect(() => {
    if (typeof window !== undefined && location === "/") {
      window.addEventListener("scroll", scrollFunction);
    }

    if (location === "/") {
      setIsShrinked(false);
      setIsDisabled(false);
    } else {
      setIsShrinked(true);
      setIsDisabled(true);
    }

    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, [location]);

  return (
    <header
      className={`${styles["header"]} ${isShrinked ? styles["scroll"] : ""}`}
    >
      <div
        className={`${styles["header__title"]} ${
          isShrinked ? styles["scroll-title"] : ""
        }`}
        onClick={() => {
          if (location !== "/") {
            naivigate("/");
            setIsDisabled(false);
            setIsShrinked(false);
          }
          setIsDisabled(false);
        }}
      >
        <img src={brand} alt="Anna's" />
        <h1>Anna's Kitchen</h1>
      </div>

      <nav className={isShrinked ? styles["scroll-nav"] : ""}>
        <Button
          textOnly
          onClick={showCartHandler}
          className={isDisabled ? styles.disabled : ""}
        >
          Cart ({totalCartItems})
        </Button>
        {accountCtx.user ? (
          buttonDisplayName
        ) : (
          <Link to="/login">
            <Button textOnly>
              <FontAwesomeIcon
                icon={faUser}
                style={{ padding: "0 0.3rem", width: "17px" }}
              />
              Account
            </Button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
