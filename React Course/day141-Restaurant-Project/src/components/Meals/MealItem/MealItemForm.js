import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";

const MealItemForm = (props) => {
  const [invalidFormInput, setInvalidFormInput] = useState(false);
  const amountInputRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmountNumber = parseInt(amountInputRef.current.value);
    console.log();
    if (
      !enteredAmountNumber ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setInvalidFormInput(true);
    } else {
      setInvalidFormInput(false);
      props.onAddToCart(enteredAmountNumber);
    }
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id, // this changed!
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+Add</button>
      {invalidFormInput && <p>Please enter a correct value</p>}
    </form>
  );
};

export default MealItemForm;
