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
        titulo: { type: String, required: true },
        cantidad: { type: Number, required: false },
        precio: { type: Number, required: true },
      },
    ],
    datosParaEntrega: {
      email: { type: String, required: true },
      pais: { type: String, required: true },
      ciudad: { type: String, required: true },
    },
    totalPrecio: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPagado: {
      type: Boolean,
      required: true,
      default: false,
    },
    fechaDePago: {
      type: Date,
    },
    isEntregado: {
      type: Boolean,
      required: true,
      default: false,
    },
    fechaDeEntrega: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Pedido = mongoose.model("Pedido", pedidoSchema);

module.exports = Pedido;
