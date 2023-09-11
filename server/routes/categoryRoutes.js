const express = require('express')
const router = express.Router()
const middleware = require('../middlewares/authMiddleware')
const Controller = require('../controllers/categoryController')

//routes
router.post('/create-category',middleware.requireSignIn,middleware.isAdmin,Controller.createCategoryController)


router.put('/update-category/:id',middleware.requireSignIn,middleware.isAdmin,Controller.updateCategoryController)
router.get('/get-category',Controller.categoryController)
router.get('/single-category/:slug',Controller.singleCategoryController)
router.post('/delete-category/:id',Controller.deleteCategoryController,middleware.requireSignIn,middleware.isAdmin)
module.exports = router