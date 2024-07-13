require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendOrderNotification = async (orderDetails) => {
  const mailOptions = {
    from: {
      name: "Virtus Bookstore",
      address: process.env.USER,
    },
    to: "origami.mgt@gmail.com", // Cambia esto a tu correo de notificación
    subject: "Nueva Orden Creada",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <div style="text-align: center;">
          <h1>Nueva Orden Creada por ${
            orderDetails.datosParaEntrega.nombre
          }</h1>
        </div>
        <p><strong>ID del Usuario:</strong> ${orderDetails.usuario}</p>
        <p><strong>Detalles de la Entrega:</strong></p>
        <ul>
          <li><strong>Email:</strong> ${
            orderDetails.datosParaEntrega.email
          }</li>
          <li><strong>Teléfono:</strong> ${
            orderDetails.datosParaEntrega.telefono
          }</li>
          <li><strong>Nombre:</strong> ${
            orderDetails.datosParaEntrega.nombre
          } ${orderDetails.datosParaEntrega.apellido}</li>
          <li><strong>Dirección:</strong> ${
            orderDetails.datosParaEntrega.direccion
          }</li>
          <li><strong>Municipio:</strong> ${
            orderDetails.datosParaEntrega.municipio
          }</li>
          <li><strong>Departamento:</strong> ${
            orderDetails.datosParaEntrega.departamento
          }</li>
        </ul>
        <p><strong>Detalles del Pedido:</strong></p>
        <table style="width: 50%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="border: 1px solid #ddd; padding: 8px;">Título</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Cantidad</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Precio</th>
            </tr>
          </thead>
          <tbody>
            ${orderDetails.pedidoItems
              .map(
                (item) => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.titulo}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.cantidad}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.precio}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        <p><strong>Total Precio:</strong> ${orderDetails.totalPrecio}</p>
        <p><strong>Pagado:</strong> ${orderDetails.isPagado ? "Sí" : "No"}</p>
        <p><strong>Entregado:</strong> ${
          orderDetails.isEntregado ? "Sí" : "No"
        }</p>
        <p><strong>ID del Pedido:</strong> ${orderDetails._id}</p>
        <p><strong>Creado el:</strong> ${new Date(
          orderDetails.createdAt
        ).toLocaleString()}</p>
        <p><strong>Actualizado el:</strong> ${new Date(
          orderDetails.updatedAt
        ).toLocaleString()}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo de notificación enviado");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
};

module.exports = { sendOrderNotification };
