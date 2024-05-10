import { createContext, useReducer } from "react";
import toast from "react-hot-toast";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  removeAllItem: () => {},
});

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => action.item.id === item.id
    );

    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    toast.success("Added to your cart");
    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => action.id === item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    toast.success("Item removed");

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ALL") {
    return { ...state, items: [] };
  }

  return state;
};

export const CartContextProvider = ({ children }) => {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  const addItem = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };

  const removeItem = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };

  const removeAllItem = () => {
    dispatchCartAction({ type: "REMOVE_ALL" });
  };

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    removeAllItem,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartContext;
