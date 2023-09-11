import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`)
     try{ if (response.data.ok) {
      setOk(true);
    } else {
      setOk(false);
    }}
    catch(error){console.log(error)}
    }
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path=""/>;
}