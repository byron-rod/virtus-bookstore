const nodemailer = require("nodemailer");
require("dotenv").config();

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

const sendWelcomeEmail = async (userEmail, userName) => {
  const mailOptions = {
    from: {
      name: "Virtus Bookstore",
      address: process.env.USER,
    },
    to: userEmail,
    subject: "Bienvenido a Virtus Bookstore",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <div style="text-align: center;">
          <h1>Virgilio Cordon</h1>
          <h2>Bienvenido, ${userName}!</h2>
        </div>
        <p>Gracias por registrarte en Virtus Bookstore. Estamos emocionados de tenerte con nosotros.</p>
        <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
        <p>Saludos,<br>El equipo de Virtus Bookstore</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo de bienvenida enviado");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
};

module.exports = { sendWelcomeEmail };
