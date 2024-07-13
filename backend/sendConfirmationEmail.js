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

const sendConfirmationEmail = async (customerEmail, orderDetails) => {
  const mailOptions = {
    from: {
      name: "Virtus Bookstore",
      address: process.env.USER,
    },
    to: customerEmail,
    subject: "Confirmación de Pedido - Virtus Bookstore",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <div style="text-align: center;">
          <h1>Virgilio Cordon</h1>
          <h3>www.virgiliocordon.com</h3>
          <h2>Gracias ${
            orderDetails.datosParaEntrega.nombre
          } por tu compra!</h2>
        </div>
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
        </br>
        <p><strong>ID del Pedido:</strong> ${orderDetails._id}</p>
         <p>Sera procesado el pago y enviaremos tu pedido por Cargo Expreso lo antes posible.</p>
         <p>El proveedor de su despacho requiere <strong>2 días hábiles para la capital y 3 días hábiles para el interior del país.</strong></p>
         </br>
        <p><strong>Detalles de tu pedido:</strong></p>
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
        <p><strong>Total Precio: </strong>${orderDetails.totalPrecio}</p>
        <p>Esperamos que disfrute disfrute su lectura.</p>
        <p>Exitos!</p>
        <div style="display: flex;">
          <p style="margin-right: 20px; font-size: 16px; font-weight: bold;">Team Virtus</p>
          <img src="https://virtusinstitute.com/wp-content/uploads/vi-logo-w.png" alt="Virtus Bookstore" style="width: 300px;"/>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo de confirmación enviado al cliente");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
};

module.exports = { sendConfirmationEmail };
