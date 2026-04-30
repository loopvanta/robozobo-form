// const db = require("../db");

// exports.registerUser = (req, res) => {
//   const { name, email, phone } = req.body;

//   if (!name || !email || !phone) {
//     return res.send("All fields required");
//   }

//   const sql = "INSERT INTO users (name, email, phone) VALUES (?, ?, ?)";

//   db.query(sql, [name, email, phone], (err) => {
//     if (err) {
//       console.log(err);
//       return res.send("Database error ❌");
//     }

//     res.send("Registration successful ✅");
//   });
// };

// const db = require("../db");
// const nodemailer = require("nodemailer");

// 🔐 EMAIL TRANSPORTER
// const transporter = nodemailer.createTransport({
//   // service: "gmail",
//   host: "smtp-relay.brevo.com",
//   port: 587,
//   secure: true,
//   auth: {
//   user: process.env.EMAIL_USER,
//   pass: process.env.EMAIL_PASS
// }
// });
//  NEW CODE
const db = require("../db");
const axios = require("axios");

// 📌 REGISTER FUNCTION
exports.registerUser = async (req, res) => {
  const { phone, email, name, parent, grade, course, slot } = req.body;

  const sql = `
    INSERT INTO users (phone, email, name, parent, grade, course, slot)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [phone, email, name, parent, grade, course, slot];

  db.query(sql, values, async (err, result) => {
    if (err) {
      console.log("DB Error ❌", err);
      return res.status(500).send("Database Error");
    }

    // 📧 SEND EMAIL USING BREVO API
    try {
      await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
          sender: { email: process.env.EMAIL_USER }, // your verified email
          to: [{ email: email }],
          subject: "🎉 Registration Successful - Robozobo",
          htmlContent: `
            <h2>Welcome to Robozobo 🚀</h2>
            <p>Hi <b>${name}</b>,</p>
            <p>Your registration has been successfully completed 🎉</p>
            <hr>
            <p><b>📘 Course:</b> ${course}</p>
            <p><b>🕒 Slot:</b> ${slot}</p>
            <p><b>🎓 Grade:</b> ${grade}</p>
            <hr>
            <p>We will contact you soon!</p>
          `
        },
        {
          headers: {
            "api-key": process.env.BREVO_API_KEY,
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Mail sent ✅");

    } catch (error) {
      console.log("Mail error ❌", error.response?.data || error.message);
    }

    res.send("Registered + Email Sent 🎉");
  });
};