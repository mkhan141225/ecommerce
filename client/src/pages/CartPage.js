import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/Cart";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const Cart = () => {

 
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  //instance we get from braintree
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  //handle payment

  
  //total cart price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //first store the cart items in a list myCart
  //remove item using findIndex and splice

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);


  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
     await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dasboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      
      setLoading(false);
    }
  };

  return (
    <Layout title={"Cart"}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center p-2 bg-light">
              {`hello ${auth?.token && auth?.user.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length >= 1
                ? `you have ${cart.length} items in your cart ${
                    auth?.token ? "" : ", Please login to checkout"
                  }`
                : "your cart is empty"}
            </h4>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 ">
            Cart item
            {cart?.map((p) => (
              <div className=" mb-2 p-3 ms-3 card flex-row">
                <div className="col-md-4 ">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top "
                    alt={p.name}
                    width="20px"
                    height={"150px"}
                  />
                </div>

                <div className="col-md-8 ">
                  <h4>{p.description.substring(0.3)}</h4>
                  <h4>{p.price}</h4>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      removeCartItem(p._id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h4>Cart Summary</h4>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>TOTAL: {totalPrice()}</h4>
            <div className="mt-4">
              {!clientToken || !cart?.length ? 
                ("")
                 : 
                 (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={ handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout> 
  );
};

export default Cart;
