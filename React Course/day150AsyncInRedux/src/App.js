import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/Layout/Notification";

import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";

import { fetchCartData, sendCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const isCartVisible = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector((state) => state.ui.notification);

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartData());
  }, []);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) dispatch(sendCartData(cart));
  }, [cart]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {isCartVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
