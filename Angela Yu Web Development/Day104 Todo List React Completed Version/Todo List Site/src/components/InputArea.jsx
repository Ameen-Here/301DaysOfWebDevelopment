import React from "react";

function InputArea(props) {
  return (
    <div className="form">
      <input onChange={props.onSubmit} type="text" value={props.text} />
      <button onClick={props.addItem}>
        <span>Add</span>
      </button>
    </div>
  );
}

export default InputArea;
