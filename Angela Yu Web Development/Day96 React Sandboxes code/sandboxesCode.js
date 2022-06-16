/////////////////////////////////////////
// JSX Code Challenge

//Create a react app from scratch.
import React from "react";
import ReactDOM from "react-dom";
//It should display a h1 heading.
//It should display an unordered list (bullet points).
//It should contain 3 list elements.
ReactDOM.render(
  <div>
    <h1>My favourite food</h1>
    <ul>
      <li>Bacon</li>
      <li>Noodles</li>
      <li>Jamon</li>
    </ul>
  </div>,
  document.getElementById("root")
);

/////////////////////////////////////////
// String literals and JS expression in JSX
import React from "react";
import ReactDOM from "react-dom";

const name = "Ameen";
const luckNumber = 612;

ReactDOM.render(
  <div>
    <h1>Hello World! My name is {name}</h1>
    <p>My lucky number is {luckNumber === 612 ? luckNumber : 0}</p>
  </div>,
  document.getElementById("root")
);

//Create a react app from scratch.
import React from "react";
import ReactDOM from "react-dom";

const name = "Ameen Noushad";
const dt = new Date();
const year = dt.getFullYear();

//It should display 2 paragraph HTML elements.
//The paragraphs should say:
//Created by YOURNAME.
//Copyright CURRENTYEAR.
//E.g.
//Created by Angela Yu.
//Copyright 2019.

ReactDOM.render(
  <div>
    <p>Created by {name}</p>
    <p>Copyright &copy;{year}</p>
  </div>,
  document.getElementById("root")
);
