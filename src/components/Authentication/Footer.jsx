import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>
        Go back to the <Link to="/">Homepage</Link>
      </p>
    </div>
  );
};

export default Footer;
