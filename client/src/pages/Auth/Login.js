import React ,{useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
const location=useLocation()
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
        .post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
          email,

          password,
        })
        .then((response) => {
          console.log(response.data);
setAuth({...auth,
  user:response.data.user,
  token:response.data.token
})
//creating a variable "auth" in local storage and convert to string
localStorage.setItem('auth',JSON.stringify(response.data))
          navigate( location.state||"/");
         
        });
    } catch (error) {
     console.error("something went wrong");
    }
  }

  return (
    <div>
      <Layout title={"Sign Up page"}>
        <div className="register">
          <h1>Log In Form</h1>
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
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-3">
            <button type="submit" className="btn btn-primary " >
       Login
            </button>
          
            </div>
           <button type="submit" className="btn btn-primary " onClick={()=>{navigate('/forgot-password')}}>
             Forgot Password
            </button>
           
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default Login;
