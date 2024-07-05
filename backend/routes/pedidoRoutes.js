const express = require("express");
const router = express.Router();
const {
  addPedidoItems,
  getMisPedidos,
  getPedidoById,
  updatePedidoToPaid,
  updatePedidoToDelivered,
  getPedidos,
} = require("../controller/pedidoController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").post(protect, addPedidoItems).get(protect, admin, getPedidos);
router.route("/mispedidos").get(protect, getMisPedidos);
router.route("/:id").get(protect, getPedidoById);
router.route("/:id/pagar").put(protect, updatePedidoToPaid);
router.route("/:id/enviar").put(protect, admin, updatePedidoToDelivered);

module.exports = router;
