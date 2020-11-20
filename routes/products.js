const router = require("express").Router();
const {
  addBulkProducts,
  addProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  makeReview,
  searchByKeyword,
} = require("../controllers/products");
const { authenticate, authorize } = require("../helpers/auth");


router.route("/search").get(searchByKeyword);
router.route("/").get(getAllProducts);
router.route("/:id").get(getSingleProduct);
router.route("/bulk").post(authenticate, authorize("admin"), addBulkProducts);
router.route("/add/singleproduct").post(authenticate, authorize("admin"),addProduct);
router.route("/update/:id").put(authenticate, authorize("admin"),updateProduct);
router.route("/delete/:id").delete(authenticate, authorize("admin"),deleteProduct);
router.route("/review/:id").post(authenticate, makeReview);

module.exports = router;
