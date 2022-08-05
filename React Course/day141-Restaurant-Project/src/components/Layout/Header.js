import React, { Fragment } from "react";

import mainImg from "../../assets/meals.jpg";
import classes from "./Header.module.css";

import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>FoodHunter</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mainImg} alt="Delicious image of foods in a table" />
      </div>
    </Fragment>
  );
};

export default Header;
