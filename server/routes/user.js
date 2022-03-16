const express = require("express");
const router = express.Router();

//MIDDLEWARE
const { authCheck } = require("../middlewares/auth");

//CONTROLERS
const { userCart, getUserCart, emptyCart,saveAddress } = require("../controllers/user");

//route
router.post("/user/cart", authCheck, userCart); //save cart
router.get("/user/cart", authCheck, getUserCart); // get cart
router.delete("/user/cart", authCheck, emptyCart); //empty cart
router.post("/user/address", authCheck, saveAddress);
module.exports = router;
