import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";

import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");

  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
      setPhoto(data.product.photo);
      setId(data.product._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  //getting categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log("something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);




  
  //create product button functionality
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      photo && productData.append("photo", photo);
      productData.append("shipping", shipping);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("product created successfully");
        navigate('/dashboard/admin/products')
      } else {
        console.log("something error in sending product details");
        toast.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

//delete 
const handleDelete = async()=>{

try {
    let answer = window.prompt("Are you sure you want to delete? ")
    if(!answer) return;
  const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`)  
toast.success("product details")
navigate('/dashboard/admin/products')

} catch (error) {
    console.log(error)
}
}

  return (
    <Layout title={"update product"}>
      <div className="container-fluid m-70 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div class="col-md-9">
            <h1 className="text-center">Update Product </h1>

            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="select a catgeory"
                size="large"
                showSearch
                value={category}
                className="form-select mb-3 "
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3 ">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                    hidden
                  />
                </label>
              </div>
              {/* preview photo */}
              {/* if photo exists then show the preview else upload new photo by making axios call */}
              <div className="mb-3 ">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      height={"200"}
                      alt="product photo"
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={ `${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                      height={"200"}
                      alt="product photo"
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              {/* input fields */}
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={price}
                  placeholder="Enter Price"
                  className="form-control"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={quantity}
                  placeholder="Enter Quantity"
                  className="form-control"
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="select shipping"
                  size="large"
                  showSearch
                  value={shipping ? "yes" : "no"}
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">NO</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
            </div>

            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleUpdate}>
                UPDATE PRODUCT
              </button>
              <div className="mt-3">
              <button className="btn btn-danger" onClick={handleDelete}>
               DELETE PRODUCT
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
