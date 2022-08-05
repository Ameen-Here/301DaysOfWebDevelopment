import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [isHiglightedBtn, setIsHighlightedBtn] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numberOfCartItems = items.reduce(
    (curNum, item) => curNum + item.amount,
    0
  );
  const btnClasses = `${classes.button} ${isHiglightedBtn ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) return;
    setIsHighlightedBtn(true);
    const timer = setTimeout(() => setIsHighlightedBtn(false), 300);

    return () => clearTimeout(timer);
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
