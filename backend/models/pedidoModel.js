const mongoose = require("mongoose");

const pedidoSchema = mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Usuario",
    },
    pedidoItems: [
      {
        nombre: { type: String, required: true },
        cantidad: { type: Number, required: true },
        portada: { type: String, required: true },
        precio: { type: Number, required: true },
        libro: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Book",
        },
      },
    ],
    direccionCorreoEnvio: {
      email: { type: String, required: true },
      ciudad: { type: String, required: true },
      pais: { type: String, required: true },
    },
    metodoPago: {
      type: String,
      required: true,
    },
    resultadoPago: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email: { type: String },
    },
    totalPrecio: {
      type: Number,
      required: true,
      default: 0.0,
    },
    estaPagado: {
      type: Boolean,
      required: true,
      default: false,
    },
    fechaPago: {
      type: Date,
    },
    estaEnviado: {
      type: Boolean,
      required: true,
      default: false,
    },
    fechaEnvio: {
      type: Date,
    },
    checkoutSessionId: {
      type: String, // Para almacenar el ID de sesión de checkout de Recurrente
    },
  },
  {
    timestamps: true,
  }
);

const Pedido = mongoose.model("Pedido", pedidoSchema);

module.exports = Pedido;
