const router = require("express").Router();
const {
  createOrder,
  getOrder,
  getUserOrder,
  adminOrders,
  markOrderDelivered,
} = require("../controllers/orders");
const { authenticate, authorize } = require("../helpers/auth");


router.route("/adminorders").get(authenticate, authorize("admin"), adminOrders);
router.route("/markorderasdelivered").get(authenticate, authorize("admin"),markOrderDelivered);
router.route("/createorder").post(authenticate, createOrder);
router.route("/getorder/:id").get(authenticate, getOrder);
router.route("/getallorders/:id").get(authenticate, getUserOrder);

module.exports = router;
