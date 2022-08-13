import { Fragment } from "react";
import Counter from "./components/Counter";
import Auth from "./components/Auth";
import Header from "./components/Header";
import { useSelector, useDispatch } from "react-redux/es/exports";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Fragment>
      <Header />
      {!isAuthenticated && <Auth />}
      <Counter />;
    </Fragment>
  );
}

export default App;
