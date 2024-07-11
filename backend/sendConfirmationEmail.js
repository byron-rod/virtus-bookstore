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
          <img src="/frontend/public/images/logo.png" alt="Virtus Bookstore" style="width: 100px;"/>
          <h1>Gracias por tu compra!</h1>
        </div>
        <p><strong>Detalles de tu pedido:</strong></p>
        <table style="width: 100%; border-collapse: collapse;">
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
        <p>Gracias por comprar en Virtus Bookstore. Esperamos que disfrutes de tus libros!</p>
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
