const express = require("express");
const router = express.Router();

//MIDDLEWARE
const { authCheck } = require("../middlewares/auth");

//CONTROLERS
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  orders,
  addToWishList,
  wishlist,
  removeFromWishlist,
} = require("../controllers/user");

//route
router.post("/user/cart", authCheck, userCart); //save cart
router.get("/user/cart", authCheck, getUserCart); // get cart
router.delete("/user/cart", authCheck, emptyCart); //empty cart
router.post("/user/address", authCheck, saveAddress);

//orders
router.post("/user/order", authCheck, createOrder);
router.get("/user/orders", authCheck, orders);

//coupon
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);

//wishlist
router.post("/user/wishlist", authCheck, addToWishList);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);

module.exports = router;
