import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import styles from "../UI/Card.module.css";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();
  const addUserHandler = (e) => {
    e.preventDefault();
    // Checking if the value is valid
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

    setEnteredAge("");
    setEnteredUsername("");
  };

  const onChangeUsername = (e) => {
    setEnteredUsername(e.target.value);
  };

  const onChangeAge = (e) => {
    setEnteredAge(e.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
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
          <input
            id="username"
            type="text"
            onChange={onChangeUsername}
            value={enteredUsername}
          ></input>
          <label htmlFor="age">Age (In Years)</label>
          <input
            id="age"
            type="number"
            onChange={onChangeAge}
            value={enteredAge}
          ></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
