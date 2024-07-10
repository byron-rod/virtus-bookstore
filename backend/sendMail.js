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
    text: `Se ha creado una nueva orden con los siguientes detalles:\n\n${JSON.stringify(
      orderDetails,
      null,
      2
    )}`,
    html: `<b>Se ha creado una nueva orden con los siguientes detalles:</b><br><pre>${JSON.stringify(
      orderDetails,
      null,
      2
    )}</pre>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo de notificación enviado");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
};

module.exports = { sendOrderNotification };
