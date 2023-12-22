const express = require("express");
const router = express.Router();

const {
  getProducts,
  getAdminProducts,
  getPriceProduct,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  getProductAscending,
  getProductDescing,
  getProductRangePrice
} = require("../controllers/productController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/products").get(getProducts);
router.route("/admin/products").get(getAdminProducts);
router.route("/product/:id").get(getSingleProduct);
router.route("/product/:id/price").get(getPriceProduct);

//Tang dan va giam dan
router.route("/product/sort/asc").get(getProductAscending)
router.route("/product/sort/desc").get(getProductDescing)

//Khoang gia 
router.route("/product").get(getProductRangePrice)

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(isAuthenticatedUser, getProductReviews);
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);
module.exports = router;
