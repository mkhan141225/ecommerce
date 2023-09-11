import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/Cart";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title="Orders" className="bg-primary-subtle">
      <div class="container-fluid m-3 p-3 bg-primary-subtle">
        <div class="row">
          <div class="col-3">
            <UserMenu />
          </div>
          <div class="col-9">
            <div className="card w-70 p-3 m-3 ">
              <h1 className="text-center">All Orders</h1>
              {orders.map((o, i) => (
                <div className="border-shadow ">
                  <table className="table ">
                  
                    <thead >
                  
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                     
                    </thead>
               
                 
                    <tbody>
                      <tr >
                        <td>{i + 1}</td> 
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment ?.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="container ">
                    {o?.products.map((p, i) => (
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
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
