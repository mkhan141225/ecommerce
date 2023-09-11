const express = require('express')
const router = express.Router()
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware')
const cors = require("cors")
const {createProductController,getProductController,getSingleProductController,productPhotoController,deleteProductController,updateProductController, productFilterController, productCountController, productListController, searchProductController, relatedProductController, productCategoryController, braintreeTokenController, brainTreePaymentController}= require('../controllers/productController')
const formidable = require('express-formidable');

router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)

router.get('/get-product',getProductController)
router.get('/get-product/:slug',getSingleProductController)
router.get('/product-photo/:id',productPhotoController)
router.post('/delete-product/:id',requireSignIn,isAdmin,deleteProductController)
router.put('/update-product/:id',requireSignIn,isAdmin,formidable(),updateProductController)


//filter products

router.post('/product-filters',productFilterController)

//product count

router.get('/product-count',productCountController)



//product per page
router.get('/product-list/:page',productListController)


//search product
router.get('/search-product/:keyword',searchProductController)


//similar products in productdetails
router.get('/related-product/:pid/:cid',relatedProductController)


//category wise product router
router.get('/product-category/:slug',productCategoryController)


//payment route
//token for verifying account
router.get('/braintree/token',braintreeTokenController)

//paymnet
router.post('/braintree/payment',requireSignIn,brainTreePaymentController)

module.exports = router