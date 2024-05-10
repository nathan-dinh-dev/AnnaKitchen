import { useEffect, useState } from "react";
import styles from "./Meals.module.css";
import MealItem from "./MealItem.jsx";
import axios from "axios";
import MealHeader from "./MealHeader.jsx";

const Meals = () => {
  const [loadedMeals, setLoadedMeals] = useState([]);
  const [isFetched, setIsFetch] = useState(true);

  useEffect(() => {
    if (isFetched) {
      async function fetchMeals() {
        const menu = await axios.get("http://localhost:5000/menu");
        setLoadedMeals(menu.data.data);
      }

      fetchMeals();
    }
    return () => setIsFetch(false);
  }, []);

  return (
    <>
      <div className={styles["meals-container"]}>
        <MealHeader
          title="Appetizers & Rolls"
          description="Embark on a culinary journey with our meticulously crafted selection of appetizers and rolls. Each dish is thoughtfully prepared to tantalize your taste buds and set the stage for an unforgettable dining experience. From crispy classics to refreshing salads, our starters promise to ignite your appetite and leave you craving for more. Indulge in the perfect prelude to your culinary adventure."
        />
        <ul className={styles.meals}>
          {loadedMeals
            .filter((item) => item.category === "Appetizer")
            .map((meal) => (
              <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
      </div>

      <div className={styles["meals-container"]}>
        <MealHeader
          title="Main Course"
          description={
            "Prepare to be captivated by our array of main dishes, each one a masterpiece of flavor and presentation. From succulent meats to exquisite seafood, our main courses showcase the finest ingredients expertly prepared to perfection. Whether you're craving a hearty steak, a delicate fish, or a robust pasta, our menu offers something to delight every palate. Elevate your dining experience and savor the essence of culinary excellence with our captivating main dishes."
          }
        />
        <ul className={styles.meals}>
          {loadedMeals
            .filter((item) => item.category === "Main Course")
            .map((meal) => (
              <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
      </div>

      <div className={styles["meals-container"]}>
        <MealHeader
          title="Dessserts"
          description={
            "Treat yourself to a divine finale with our decadent selection of desserts. Each confection is a celebration of sweetness and artistry, designed to enchant your senses and leave a lingering impression. From luscious cakes to velvety puddings, our desserts are crafted with the finest ingredients and infused with passion. Whether you prefer rich chocolates, fruity delights, or creamy indulgences, our menu offers an exquisite array of sweet temptations to satisfy every craving. Surrender to the allure of dessert and embark on a journey of pure culinary bliss."
          }
        />
        <ul className={styles.meals}>
          {loadedMeals
            .filter((item) => item.category === "Dessert")
            .map((meal) => (
              <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
      </div>

      <div className={styles["meals-container"]}>
        <MealHeader
          title="Drinks"
          description={
            "Refresh and rejuvenate with our enticing selection of drinks, meticulously curated to complement your dining experience. From crisp wines to handcrafted cocktails, our beverage menu offers a symphony of flavors to tantalize your palate. Sip on expertly brewed coffees and teas, or indulge in our signature cocktails expertly crafted by our skilled mixologists. Whether you're seeking a classic favorite or an adventurous new discovery, our drink menu is sure to satisfy all tastes. Elevate your meal with the perfect libation and toast to unforgettable moments at our establishment."
          }
        />
        <ul className={styles.meals}>
          {loadedMeals
            .filter((item) => item.category === "Drinks")
            .map((meal) => (
              <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
      </div>
    </>
  );
};

export default Meals;
