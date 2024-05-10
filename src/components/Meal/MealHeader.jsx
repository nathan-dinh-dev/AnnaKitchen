import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./MealHeader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MealHeader = ({ title, description }) => {
  return (
    <div className={styles["meal-header"]}>
      <h3>{title}</h3>
      <p>
        <FontAwesomeIcon icon={faQuoteLeft} color="#ddf45b" />
        {description} <FontAwesomeIcon icon={faQuoteRight} color="#ddf45b" />
      </p>
    </div>
  );
};

export default MealHeader;
