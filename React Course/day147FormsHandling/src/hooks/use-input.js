import { useReducer, useState } from "react";

const initialStateValue = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return initialStateValue;
  }
  return initialStateValue;
};

const useInput = (validateValue) => {
  const [inputState, inputDispatch] = useReducer(
    inputStateReducer,
    initialStateValue
  );

  const enteredValueValid = validateValue(inputState.value);

  const valueHasError = !enteredValueValid && inputState.isTouched;

  const valueChangeHandler = (e) => {
    inputDispatch({
      type: "INPUT",
      value: e.target.value,
    });
  };

  const valueLostFocusHandler = () => inputDispatch({ type: "BLUR" });

  const reset = () => inputDispatch({ type: "RESET" });

  return {
    value: inputState.value,
    hasError: valueHasError,
    valueChangeHandler,
    valueLostFocusHandler,
    enteredValueValid,
    reset,
  };
};

export default useInput;
