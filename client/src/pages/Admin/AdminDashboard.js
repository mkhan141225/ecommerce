import React from "react";
import { Layout } from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      AdminDashboard
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-3">
            <AdminMenu />
          </div>
          <div className="col-9">
            <div className="card w-70 p-3">
              <h3>Admin name: {auth?.user?.name}</h3>
              <h3>Admin email: {auth?.user?.email}</h3>
              <h3>Admin phone: {auth?.user?.phone}</h3>
              <h3>Admin address: {auth?.user?.address }</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
