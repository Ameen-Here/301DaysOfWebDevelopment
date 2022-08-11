import useInput from "../hooks/use-input";

const isInputEmpty = (value) => value.trim() !== "";

const VALIDEMAILREGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const isEmailFormatValid = (value) => value.match(VALIDEMAILREGEX);

const BasicForm = (props) => {
  const {
    value: enteredFName,
    valueChangeHandler: fNameChangeHandler,
    valueLostFocusHandler: fNameLostFocusHandler,
    hasError: fNameError,
    reset: fNameReset,
    enteredValueValid: fNameValid,
  } = useInput(isInputEmpty);

  const {
    value: enteredLName,
    valueChangeHandler: lNameChangeHandler,
    valueLostFocusHandler: lNameLostFocusHandler,
    hasError: lNameError,
    reset: lNameReset,
    enteredValueValid: lNameValid,
  } = useInput(isInputEmpty);

  const {
    value: enteredEmail,
    valueChangeHandler: emailChangeHandler,
    valueLostFocusHandler: emailLostFocusHandler,
    hasError: emailError,
    reset: emailReset,
    enteredValueValid: emailValid,
  } = useInput(isEmailFormatValid);

  let isFormValid = false;

  if (fNameValid && lNameValid && emailValid)
    // && other validity if there are more input and put them in dependency
    isFormValid = true;

  const fNameClasses = fNameError ? "form-control invalid" : "form-control";
  const lNameClasses = lNameError ? "form-control invalid" : "form-control";
  const emailClasses = emailError ? "form-control invalid" : "form-control";

  const formSubmissionHandler = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    console.log(enteredFName);
    console.log(enteredLName);
    console.log(enteredEmail);
    fNameReset();
    lNameReset();
    emailReset();
  };
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="control-group">
        <div className={fNameClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={enteredFName}
            onChange={fNameChangeHandler}
            onBlur={fNameLostFocusHandler}
          />
          {fNameError && <p className="error-text">Enter correct First Name</p>}
        </div>
        <div className={lNameClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            value={enteredLName}
            onChange={lNameChangeHandler}
            onBlur={lNameLostFocusHandler}
          />
          {lNameError && <p className="error-text">Enter correct Last Name</p>}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailLostFocusHandler}
        />
      </div>
      {emailError && <p className="error-text">Enter correct email Address</p>}
      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
