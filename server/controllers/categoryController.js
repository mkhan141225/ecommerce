const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(501).send({
        success: false,
        error,
        message: "name is required",
      });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      res.status(200).send({
        success: true,
        error,
        message: "category already exists",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res
      .status(200)
      .send({ message: "new category created", success: true, category });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in category",
    });
  }
};

//update category

const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res
      .status(200)
      .send({ message: " category updated", success: true, category });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in category",
    });
  }
};

const categoryController = async (req, res) => {
  try {
    const { id } = req.body;
    const category = await categoryModel.find({});

    res.status(200).send({
      message: "fetched categories",
      success: true,
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in fetching categories",
    });
  }
};

const singleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug: slug });
    res.status(200).send({
      success: true,
      message: "Single category fetched successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error while getting category", error });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: " category deleted successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error deleting category", error });
  }
};

module.exports = {
  createCategoryController,
  updateCategoryController,
  categoryController,
  singleCategoryController,
  deleteCategoryController,
};
