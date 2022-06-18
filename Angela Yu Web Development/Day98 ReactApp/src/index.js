//1. Create a new React app.

import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";

import App from "./App.jsx";

const root = createRoot(document.getElementById("root"));

root.render(<App />);

//6. Make sure that the final website is styled like the example shown here:
//https://l1pp6.csb.app/

//HINT: You will need to study the classes in teh styles.css file to appy styling.

// React props

// import React from "react";
// import ReactDOM from "react-dom";

// function Card(props) {
//   return (
//     <div className={props.class}>
//       <h2>{props.name}</h2>
//       <img src={props.image} alt="avatar_img" />
//       <p>{props.phone}</p>
//       <p>{props.email}</p>
//     </div>
//   );
// }

// ReactDOM.render(
//   <Card
//     class="red1"
//     image="https://blackhistorywall.files.wordpress.com/2010/02/picture-device-independent-bitmap-119.jpg"
//     name="Beyonce"
//     email="b@beyonce.com"
//     phone="+123 456 789"
//   />,
//   document.getElementById("root")
// );

// Props practice
// import React from "react";

// import contacts from "../contacts.js";

// function Card(props) {
//   return (
//     <div>
//       <div className="card">
//         <div className="top">
//           <h2 className="name">{props.name}</h2>
//           <img className="circle-img" src={props.img} />
//         </div>
//         <div className="bottom ">
//           <p className="info">{props.phone}</p>
//           <p className="info">{props.email}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <div>
//       <h1 className="heading">My Contacts</h1>
//       <Card
//         name={contacts[0].name}
//         email={contacts[0].email}
//         phone={contacts[0].phone}
//         img={contacts[0].imgURL}
//         alt="avatar_img"
//       />
//       <Card
//         img={contacts[1].imgURL}
//         name={contacts[1].name}
//         email={contacts[1].email}
//         phone={contacts[1].phone}
//       />
//       <Card
//         img={contacts[2].imgURL}
//         name={contacts[2].name}
//         email={contacts[2].email}
//         phone={contacts[2].phone}
//       />
//     </div>
//   );
// }

// export default App;
