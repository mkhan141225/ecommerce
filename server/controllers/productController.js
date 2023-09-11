const productModel = require("../models/productModel");
const fs = require("fs");
const slugify = require("slugify");
const categoryModel = require("../models/categoryModel");
const braintree = require("braintree");
const dotenv = require("dotenv");
const orderModel = require("../models/orderModel");

dotenv.config();

//paymeny gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

const createProductController = async (req, res) => {
  try {
    const { name, slug, price, description, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation

    switch (true) {
      case !name:
        res.status(500).send({ error: "name is required" });
      case !description:
        res.status(500).send({ error: "description is required" });
      case !price:
        res.status(500).send({ error: "price is required" });
      case !quantity:
        res.status(500).send({ error: "quantity is required" });
      case !shipping:
        res.status(500).send({ error: "shipping is required" });
      case !category:
        res.status(500).send({ error: "category is required" });
      case photo && photo.size > 1000000:
        res
          .status(500)
          .send({ error: "photo is required and should be less than 1mb" });
    }

    const products = await new productModel({
      ...req.fields,
      slug: slugify(name),
    });
    //validating photo
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(200).send({
      success: true,
      message: "product created successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "error in creating product", error });
  }
};

//fetching all products
const getProductController = async (req, res) => {
  try {
    //adding filters
    //don't select photo
    //limit 12 products
    //sort  based on createdAt
    const product = await productModel
      .find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 })
      .populate("category");
    res.status(200).send({
      success: true,
      countTotal: product.length,
      message: "products fetched successfully",
      product,
      countTotal: product.length,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "error in fetching product", error });
  }
};

const getSingleProductController = async (req, res) => {
  try {
    //const { slug } = req.params;
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,

      message: "product fetched successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in fetching the product",
      error,
    });
  }
};

const productPhotoController = async (req, res) => {
  try {
    //const { pid } = req.params
    const product = await productModel.findById(req.params.id).select("photo");
    if (product.photo.data) {
      res.set("content-type", product.photo.contentType);
      res.status(200).send(product.photo.data);
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in fetching photo",
      error,
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findByIdAndDelete(id).select("-photo");
    res.status(200).send({
      success: true,
      message: " product deleted successfully",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in deleting product",
      error,
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { name, slug, price, description, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation

    switch (true) {
      case !name:
        res.status(500).send({ error: "name is required" });
      case !description:
        res.status(500).send({ error: "description is required" });
      case !price:
        res.status(500).send({ error: "price is required" });
      case !quantity:
        res.status(500).send({ error: "quantity is required" });
      case !shipping:
        res.status(500).send({ error: "shipping is required" });
      case !category:
        res.status(500).send({ error: "category is required" });
      case photo && photo.size > 1000000:
        res
          .status(500)
          .send({ error: "photo is required and should be less than 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    //validating photo
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(200).send({
      success: true,
      message: "product updated successfully",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in updating product",
      error,
    });
  }
};

//filter controller

const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error while filtering products",
      success: false,
      error,
    });
  }
};

const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "error in product count", success: false, error });
  }
};

//products per page
const productListController = async (req, res) => {
  try {
    const perPage = 1;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({ success: true, products });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "error in product count", success: false, error });
  }
};

//search product controller

const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

//related products controller
const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,

      message: "related products fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      message: "successfully fetched products",
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ success: false, message: "error in fetching product", error });
  }
};

//paymnet gateway api
//token
const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//paymnet
const brainTreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
   let  total = 0;
    cart.map((p) => {
      total += p.price;
      return total
    });
   

    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: { submitForSettlement: true },
      },

      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send({message:"payment failed",error});
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({message:"payment failed",error});
  }
};

module.exports = {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productFilterController,
  productCountController,
  productListController,
  searchProductController,
  relatedProductController,
  productCategoryController,
  braintreeTokenController,
  brainTreePaymentController,
};
