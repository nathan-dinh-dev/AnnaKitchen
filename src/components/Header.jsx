import styles from "./Header.module.css";
import brand from "/brand.png";
import Button from "./UI/Button";

const Header = () => {
  return (
    <header className={styles["header"]}>
      <div className={styles["header__title"]}>
        <img src={brand} alt="Anna's" />
        <h1>Anna's Kitchen</h1>
      </div>

      <nav>
        <Button textOnly>Cart (0)</Button>
        <Button textOnly>Login</Button>
      </nav>
    </header>
  );
};

export default Header;
