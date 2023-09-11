import React, { useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const ForgotPassword = () => {

   const navigate= useNavigate()
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const res = await axios
        .post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {
          email,

          newPassword,answer
        })
      if (res ) {
        toast.success(res.data.message);
        navigate("/login")
        console.log("done changing")
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"forgot-password"}>
      <div className="register">
        <h1>Reset Password Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Answer
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary ">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
