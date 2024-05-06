import { createContext, useReducer } from "react";

const UserProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

const modalReducer = (state, action) => {
  if (action.type === "OPEN_CART") {
    return { ...state, progress: "cart" };
  }

  if (action.type === "CLOSE_CART" || action.type === "CLOSE_CHECKOUT") {
    return { ...state, progress: "" };
  }

  if (action.type === "OPEN_CHECKOUT") {
    return { ...state, progress: "checkout" };
  }
  return state;
};

export const UserProgressContextProvider = ({ children }) => {
  const [modal, dispatchModalAction] = useReducer(modalReducer, {
    progress: "",
  });

  const showCart = () => {
    dispatchModalAction({ type: "OPEN_CART" });
  };

  const hideCart = () => {
    dispatchModalAction({ type: "CLOSE_CART" });
  };

  const showCheckout = () => {
    dispatchModalAction({ type: "OPEN_CHECKOUT" });
  };

  const hideCheckout = () => {
    dispatchModalAction({ type: "CLOSE_CHECKOUT" });
  };

  const userProgressContext = {
    progress: modal.progress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <UserProgressContext.Provider value={userProgressContext}>
      {children}
    </UserProgressContext.Provider>
  );
};

export default UserProgressContext;
