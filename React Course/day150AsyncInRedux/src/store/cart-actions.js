import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://fir-22a85-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) throw new Error("Fetching cart data failed");
      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity || 0,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!!!",
          message: "Something went wrong",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending",
        message: "Sending cart data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://fir-22a85-default-rtdb.firebaseio.com/cart.json",
        {
          method: "put",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!!!",
          message: "Sent cart data successfully",
        })
      );
    };

    sendRequest().catch((eror) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!!!",
          message: "Something went wrong",
        })
      );
    });
  };
};
