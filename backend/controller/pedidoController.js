const asyncHandler = require("../middleware/asyncHandler");
const Pedido = require("../models/pedidoModel");
const { sendOrderNotification } = require("../sendMail");
const { sendConfirmationEmail } = require("../sendConfirmationEmail");

// @desc Create new pedido
// @route POST /api/pedidos
// @access Private
const addPedidoItems = asyncHandler(async (req, res) => {
  const { pedidoItems, datosParaEntrega, totalPrecio } = req.body;

  if (!req.usuario) {
    res.status(401);
    throw new Error("Usuario no autenticado");
  }

  if (pedidoItems && pedidoItems.length === 0) {
    res.status(400);
    throw new Error("No hay libros en el pedido");
  } else {
    const pedido = new Pedido({
      pedidoItems: pedidoItems.map((x) => ({
        titulo: x.titulo,
        cantidad: x.cantidad,
        precio: x.precio,
      })),
      usuario: req.usuario._id,
      datosParaEntrega,
      totalPrecio,
    });

    const createdPedido = await pedido.save();

    await sendOrderNotification(createdPedido);
    await sendConfirmationEmail(datosParaEntrega.email, createdPedido);

    res.status(201).json(createdPedido);
  }
});

// @desc Get pedidos by user
// @route GET /api/pedidos/mispedidos
// @access Private
const getMisPedidos = asyncHandler(async (req, res) => {
  const pedidos = await Pedido.find({ usuario: req.usuario._id });
  res.status(200).json(pedidos);
});

// @desc Get pedido by ID
// @route GET /api/pedidos/:id
// @access Private
const getPedidoById = asyncHandler(async (req, res) => {
  const pedido = await Pedido.findById(req.params.id).populate(
    "usuario",
    "nombre email"
  );
  if (pedido) {
    res.status(200).json(pedido);
  } else {
    res.status(404);
    throw new Error("Pedido no encontrado");
  }
});

// @desc Update pedido to paid
// @route PUT /api/pedidos/:id/pagar
// @access Private
const updatePedidoToPaid = asyncHandler(async (req, res) => {
  const pedido = await Pedido.findById(req.params.id);

  if (pedido) {
    // Verificar el estado del pago en Recurrente (supongamos que recibimos este estado en req.body)
    const { status } = req.body;

    // Aquí debes verificar si el estado es "paid" en Recurrente
    if (status === "paid") {
      pedido.isPagado = true;
      pedido.fechaDePago = Date.now(); // Puedes establecer la fecha de pago aquí si lo necesitas
      // Guardar los cambios en la base de datos
      const updatedPedido = await pedido.save();
      res.status(201).json(updatedPedido);
    } else {
      res.status(400);
      throw new Error("Aun falta el pago del pedido");
    }
  } else {
    res.status(404);
    throw new Error("Pedido no encontrado");
  }
});

// @desc Update pedido to delivered
// @route PUT /api/pedidos/:id/enviar
// @access Private/Admin
const updatePedidoToDelivered = asyncHandler(async (req, res) => {
  const pedido = await Pedido.findById(req.params.id);

  if (pedido) {
    pedido.isEntregado = true;
    pedido.fechaDeEntrega = Date.now();

    const updatedPedido = await pedido.save();

    res.status(200).json(updatedPedido);
  } else {
    res.status(404);
    throw new Error("Pedido no encontrado");
  }
});

// @desc Get all pedidos
// @route GET /api/pedidos
// @access Private/Admin
const getPedidos = asyncHandler(async (req, res) => {
  const pedidos = await Pedido.find({}).populate("usuario", "id nombre");
  res.status(200).json(pedidos);
});

module.exports = {
  addPedidoItems,
  getMisPedidos,
  getPedidoById,
  updatePedidoToPaid,
  updatePedidoToDelivered,
  getPedidos,
};
