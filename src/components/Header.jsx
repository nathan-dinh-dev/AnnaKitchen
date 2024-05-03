import styles from "./Header.module.css";
import brand from "/brand.png";

const Header = () => {
  return (
    <header className={styles["header"]}>
      <div className={styles["header__title"]}>
        <img src={brand} alt="Anna's" />
        <h1>Anna's Kitchen</h1>
      </div>

      <nav>
        <button>Cart (0)</button>
        <button>Login</button>
      </nav>
    </header>
  );
};

export default Header;
