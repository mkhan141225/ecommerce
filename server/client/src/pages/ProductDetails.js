import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getProductDetails();
  }, [params?.slug]);

  const getProductDetails = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Product Details"}>
      {/* {JSON.stringify(product,null,4)} */}
      <div className="row mt-2 ">
        <div className="col-md-6">
          <div key={product._id} className="card m-2 ">
            <img
              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
              className="card-img-top "
              alt={product.name}
            />
            {/* <div className="card-body"></div> */}
          </div>
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Price: {product.price}</h6>
          <h6>Category: {product?.category?.name}</h6>
          {/* <h6>Shipping: {product.shipping}</h6>  */}

          <button className="btn btn-success ms-3"
                    onClick={()=>{setCart([...cart,product]);
                      localStorage.setItem('cart',JSON.stringify([...cart,product]))
                      toast.success("Items added to cart")}}
                    > ADD TO CART </button>
        </div>
      </div>
      <hr />

      <div className="row mt-2 m-2">
        <h6>similar products</h6>
        {relatedProducts.length < 1 && (
          <span className="text-center">No Similar Products To Show</span>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <>
              <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <p className="card-text">${p.price}</p>
                  <button
                    className="btn btn-primary ms-3"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    See Details
                  </button>
                  <button
                    className="btn btn-success ms-3"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                     
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
