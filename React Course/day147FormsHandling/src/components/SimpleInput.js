import useInput from "../hooks/use-input";

const VALIDEMAILREGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SimpleInput = (props) => {
  const {
    value: enteredName,
    valueChangeHandler: nameChangeHandler,
    valueLostFocusHandler: inpLostFocusHandler,
    enteredValueValid: enteredNameValid,
    hasError: inputInvalid,
    reset: nameReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    valueChangeHandler: emailChangeHandler,
    valueLostFocusHandler: emailLostFocusHandler,
    enteredValueValid: enteredEmailValid,
    hasError: emailInvalid,
    reset: emailReset,
  } = useInput((value) => value.match(VALIDEMAILREGEX));

  let isFormValid = false;

  const inputClasses = inputInvalid ? "form-control invalid" : "form-control";
  const emailClasses = emailInvalid ? "form-control invalid" : "form-control";

  if (enteredNameValid && enteredEmailValid)
    // && other validity if there are more input and put them in dependency
    isFormValid = true;

  const formSubmissionHandler = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }

    nameReset();
    emailReset();
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={inputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={inpLostFocusHandler}
        />
      </div>
      {inputInvalid && <p className="error-text">Enter correct input</p>}

      <div className={emailClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="text"
          id="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailLostFocusHandler}
        />
      </div>
      {emailInvalid && <p className="error-text">Enter correct input</p>}
      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
