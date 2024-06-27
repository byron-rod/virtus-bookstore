const express = require("express");
const {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} = require("../controller/orderController");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").post(addOrderItems).get(admin, getOrders);
router.route("/mis-pedidos").get(getMyOrders);
router.route("/:id").get(getOrderById);
router.route("/:id/pagar").put(protect, updateOrderToPaid);
router.route("/:id/enviar").put(protect, admin, updateOrderToDelivered);

module.exports = router;
