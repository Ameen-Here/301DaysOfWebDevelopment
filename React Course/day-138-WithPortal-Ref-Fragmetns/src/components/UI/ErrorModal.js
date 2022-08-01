import React from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
import Button from "./Button";
import style from "./ErrorModal.module.css";

const Backdrop = (props) => {
  return <div className={style.backdrop} onClick={props.onConfirm} />;
};

const Modal = (props) => {
  return (
    <Card className={style.modal}>
      <header className={style.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={style.content}>
        <p> {props.message} </p>
      </div>
      <footer className={style.actions}>
        <Button onClick={props.onConfirm}>Okay</Button>
      </footer>
    </Card>
  );
};

const ErrorModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-content")
      )}
      {ReactDOM.createPortal(
        <Modal
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-content")
      )}
    </React.Fragment>
  );
};

export default ErrorModal;
