import react from "react";
const CartContext = react.createContext({
  items: [{ amount: 2 }, { amount: 1 }],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;
