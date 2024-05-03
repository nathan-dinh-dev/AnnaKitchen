import styles from "./MealItem.module.css";

const MealItem = ({ meal }) => {
  return (
    <li className={styles["meal-item"]}>
      <article>
        <img src={`http://localhost:5000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className={styles["meal-item__price"]}>{meal.price}</p>
          <p className={styles["meal-item__description"]}>{meal.description}</p>
        </div>
        <p className={styles["meal-item__actions"]}>
          <button>Add to Cart</button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;
