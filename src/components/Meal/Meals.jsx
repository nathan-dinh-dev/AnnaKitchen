import { useEffect, useState } from "react";
import styles from "./Meals.module.css";
import MealItem from "./MealItem.jsx";
import axios from "axios";

const Meals = () => {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const menu = await axios.get("http://localhost:5000/menu");
      setLoadedMeals(menu.data.data);
    }

    fetchMeals();
  }, []);

  return (
    <ul className={styles.meals}>
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default Meals;
