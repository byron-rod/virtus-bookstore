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
      email_adress: { type: String, required: true },
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
      email_address: { type: String },
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
  },
  {
    timestamps: true,
  }
);

const Pedido = mongoose.model("Pedido", pedidoSchema);

module.exports = Pedido;
