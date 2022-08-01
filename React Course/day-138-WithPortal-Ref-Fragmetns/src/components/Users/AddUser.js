import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import styles from "../UI/Card.module.css";

const AddUser = (props) => {
  const enteredName = useRef();
  const enteredUserAge = useRef();

  const [error, setError] = useState();
  const addUserHandler = (e) => {
    e.preventDefault();
    // Checking if the value is valid
    const enteredUsername = enteredName.current.value;
    const enteredAge = enteredUserAge.current.value;
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Enter valid name and age value",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid Input",
        message: "Enter valid age value (>0)",
      });
      return;
    }

    // Lifting up
    props.onAddUser(enteredUsername, enteredAge);
    enteredName.current.value = "";
    enteredUserAge.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          onConfirm={errorHandler}
          title={error.title}
          message={error.message}
        ></ErrorModal>
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={enteredName}></input>
          <label htmlFor="age">Age (In Years)</label>
          <input id="age" type="number" ref={enteredUserAge}></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default AddUser;
