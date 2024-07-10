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
        cantidad: { type: Number, required: true },
        precio: { type: Number, required: true },
      },
    ],
    datosParaEntrega: {
      email: { type: String, required: true },
      telefono: { type: String, required: true },
      nombre: { type: String, required: true },
      apellido: { type: String, required: true },
      direccion: { type: String, required: true },
      municipio: { type: String, required: true },
      departamento: { type: String, required: true },
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
    metodoDePago: {
      type: String,
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
