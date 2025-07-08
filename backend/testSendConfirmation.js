require("dotenv").config();
const { sendConfirmationEmail } = require("./sendConfirmationEmail");

const dummyOrder = {
  _id: "PEDIDO123456",
  totalPrecio: 150,
  datosParaEntrega: {
    email: "cliente@ejemplo.com",
    telefono: "55555555",
    nombre: "Juan",
    apellido: "Pérez",
    direccion: "Zona 10",
    municipio: "Guatemala",
    departamento: "Guatemala",
  },
  pedidoItems: [
    {
      titulo: "Libro 1",
      cantidad: 2,
      precio: 50,
    },
    {
      titulo: "Libro 2",
      cantidad: 1,
      precio: 50,
    },
  ],
  isPagado: false,
  isEntregado: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

(async () => {
  try {
    await sendConfirmationEmail(dummyOrder.datosParaEntrega.email, dummyOrder);
    console.log("✅ Correo de confirmación enviado correctamente.");
  } catch (err) {
    console.error("❌ Error al enviar correo:", err);
  }
})();
