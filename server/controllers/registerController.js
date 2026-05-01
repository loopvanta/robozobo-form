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
           <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
    
    <h2 style="color: #2c3e50;">Welcome to the Summer Camp! 🎉</h2>

    <p>Dear Parent,</p>

    <p>
      Thank you for registering your child for our upcoming session. 
      We truly appreciate the time and effort you are investing in your child’s learning journey, 
      and we are excited to have them join us!
    </p>

    <p>To ensure a smooth and productive experience, please find the details below:</p>

    <hr>

    <h3>📌 SESSION DETAILS</h3>
    <p><b>Course:</b> ${course}</p>
    <p><b>Time Slot:</b> ${slot}</p>
    <p><b>Grade:</b> ${grade}</p>

    <hr>

    <h3>✅ PRE-SESSION CHECKLIST</h3>
    <ul>
      <li>💻 <b>Device:</b> Laptop or PC (Tablets/Phones not recommended)</li>
      <li>🔐 <b>Login Credentials:</b Keep email login ready</li>
      <li>🌐 <b>Connectivity:</b> Stable internet connection</li>
      <li>🧘 <b>Environment:</b> Quiet place for focus</li>
    </ul>

    <hr>

    <p>
      We look forward to an inspiring session! 🚀  
      If you have any questions, feel free to reach out.
    </p>

    <p style="margin-top:20px;">
      Warm regards,<br>
      <b>Robozobo Team 🤖</b>
    </p>

  </div>
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