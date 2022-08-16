import { Fragment } from "react";
import { Route } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import Product from "./pages/Product";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <Fragment>
      {/* <Route path="/">
        <h1>Let's get started</h1>
      </Route> */}

      <MainHeader />

      <main>
        <Route path="/welcome">
          <Welcome />
        </Route>
        <Route path="/product">
          <Product />
        </Route>
      </main>
    </Fragment>
  );
}

export default App;
