const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: { type: String, require: true },

    price: { type: Number, require: true },
    category: {
      type: mongoose.ObjectId,
      ref: "category",
      required: true,
    },
    quantity: { type: Number, required: true },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
