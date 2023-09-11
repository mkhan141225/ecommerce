import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";
import { Option } from "antd/es/mentions";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [auth, setAuth] = useAuth();

  const handleStatus = async(orderId,value)=>{
    try {
        const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`
        ,{status:value})
        getAllOrders()
    } catch (error) {
        console.log(error)
    }
  }



  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getAllOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Admin orders"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <div className="container  text-center  ">
            <h1 className="text-bg-dark text-bg-light">Admin Orders</h1>

            <div class="col-9">
              <div className="card  p-3 ">
                {orders.map((o, i) => (
                  <div className="border-shadow ">
                    <table className="table ">
                      <thead>
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
                        <tr>
                          <td>{i + 1}</td>
                          {/* <td>{o?.status}</td> */}
                          <Select
                            bordered={false}
                            onChange={(value,orderId) => {
                              handleStatus(o._id,value);
                            }}
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createAt).fromNow()}</td>
                          <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="container card ">
                      {o?.products.map((p, i) => (
                        <div className=" mb-2 p-3 ms-3 card flex-row ">
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
            <div></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
