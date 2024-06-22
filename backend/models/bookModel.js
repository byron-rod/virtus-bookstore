const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Usuario",
    },
    nombre: { type: String, required: true },
    rating: { type: Number, required: true },
    comentario: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const bookSchema = mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Usuario",
    },
    _id: {
      type: String,
      required: true,
    },
    titulo: {
      type: String,
      required: true,
    },
    autor: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    genero: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
      default: 0,
    },
    portada: {
      type: String,
      required: true,
    },
    contra: {
      type: String,
      required: true,
    },
    ejemplo: {
      type: String,
      required: true,
    },
    texto: {
      type: String,
      required: true,
    },
    editorial: {
      type: String,
      required: true,
    },
    ISBN: {
      type: String,
      required: false,
    },
    idioma: {
      type: String,
      required: true,
    },
    fecha_publicacion: {
      type: String,
      required: true,
    },
    formato: {
      type: String,
      required: true,
    },
    paginas: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
