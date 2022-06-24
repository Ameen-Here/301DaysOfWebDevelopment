import React, { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [listArr, setListArr] = useState([]);

  function changeText(e) {
    const { value } = e.target;
    setInputText(value);
  }

  function addTodo() {
    setListArr((prevValue) => {
      return [...prevValue, inputText];
    });
    setInputText("");
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={changeText} type="text" value={inputText} />
        <button onClick={addTodo}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {listArr.map((list) => (
            <li> {list} </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
