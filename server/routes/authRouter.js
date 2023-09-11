const express = require("express");
const router = express.Router();
const Controller = require("../controllers/authController");

const middleware = require("../middlewares/authMiddleware");

//routing for register
router.post("/register", Controller.registerController);

router.post("/login", Controller.loginController);

router.get(
  "/test",
  middleware.requireSignIn,
  middleware.isAdmin,
  Controller.testController
);

//user-auth protected
router.get("/user-auth", middleware.requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//admin-auth prtected
router.get("/admin-auth", middleware.requireSignIn,middleware.isAdmin ,(req, res) => {
  res.status(200).send({ ok: true })
});

//forgot password
router.post("/forgot-password", Controller.forgotPasswordController);



//orders for user
router.get('/orders',middleware.requireSignIn,Controller.getOrdersController)


//all orders
router.get('/all-orders',middleware.requireSignIn,middleware.isAdmin,Controller.getAllOrdersController)


//status change
router.put('/order-status/:orderId',middleware.requireSignIn,middleware.isAdmin,Controller.orderStatusController)
module.exports = router;
