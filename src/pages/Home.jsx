import Cart from "../components/Cart/Cart.jsx";
import Checkout from "../components/Checkout/Checkout.jsx";
import Meals from "../components/Meal/Meals.jsx";

const Home = () => {
  return (
    <>
      <Meals />
      <Cart />
      <Checkout />
    </>
  );
};

export default Home;
