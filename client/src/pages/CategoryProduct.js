import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout/Layout";
import {useCart} from '../context/Cart'
import toast from 'react-hot-toast'
import { useParams ,useNavigate} from "react-router-dom";
import axios from "axios";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
const navigate= useNavigate()
const [cart,setCart] =useCart()

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);

  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Layout title={"Category"}>
        
      <div className="container  mt-4 ">
       
        <h1 className="text-center">Category : {category?.name}</h1>
        <h5 className="text-center">Results Found: {products?.length}</h5>
      </div>
      <div className="row">

      {products?.map((p) => (
              <>
                <div
                  key={p._id}
                  className="card m-2"
                  style={{ width: "18rem" }}
                >
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}
                    </p>
                    <p className="card-text">${p.price}</p>
                   
                    <button className="btn btn-primary m-1"  onClick={() => navigate(`/product/${p.slug}`)}>
                      See Details
                    </button>
                    <button className="btn btn-success ms-3"
                    onClick={()=>{setCart([...cart,p]);
                      localStorage.setItem('cart',JSON.stringify([...cart,p]))
                      toast.success("Items added to cart")}}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </>
            ))}
        

      </div>
    </Layout>
  );
};

export default CategoryProduct;
