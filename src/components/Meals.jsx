import { useEffect, useState } from "react";
import styles from "./Meals.module.css";

const Meals = () => {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("http://localhost:5000/meals");

      if (!response.ok) {
      }

      const meals = await response.json();
      setLoadedMeals(meals);
    }

    fetchMeals();
  }, []);

  return (
    <ul className={styles.meals}>
      {loadedMeals.map((meal) => (
        <li id={meal.id}>{meal.name}</li>
      ))}
    </ul>
  );
};

export default Meals;
