import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Policy from "./pages/Policy";

import { PageNotfound } from "./pages/PageNotfound";
import Signup from "./pages/Auth/Signup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Private";
import { ForgotPassword } from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Products from "./pages/Admin/Products";
import Users from "./pages/Admin/Users";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import Cart from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/category/:slug" element={<CategoryProduct/>} />
        <Route path ="/product/:slug" element={<ProductDetails/>}/>
        <Route path = "/search" element= {<Search/>}/>
        <Route path="/dashboard" element={<PrivateRoute />}>
         
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile/>}/>
          <Route path="user/orders" element={<Orders/>}/>
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory/>}/>
          <Route path="admin/create-product" element={<CreateProduct/>}/>
          <Route path="admin/products" element={<Products/>}/>
          <Route path="admin/users" element={<Users/>}/>
          <Route path="admin/orders" element={<AdminOrders/>}/>
          <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
          <Route path="admin/products" element={<Products/>}/>
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<PageNotfound />} />
      </Routes>
    </>
  );
}

export default App;
