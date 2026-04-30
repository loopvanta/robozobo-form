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

const db = require("../db");
const nodemailer = require("nodemailer");

// 🔐 EMAIL TRANSPORTER
const transporter = nodemailer.createTransport({
  // service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "gem.risedge@gmail.com",        // 👉 replace
    pass: "sedhmkkyaqwlfmqd"            // 👉 replace (NOT normal password)
  }
});

// 📌 REGISTER FUNCTION
exports.registerUser = (req, res) => {
  const { phone, email, name, parent, grade, course, slot } = req.body;

  // 🧾 SQL QUERY
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

        // ✅ SEND RESPONSE IMMEDIATELY (IMPORTANT)
    res.status(200).send("Registered successfully 🎉");

    // 📧 SEND EMAIL IN BACKGROUND (NON-BLOCKING)
    transporter.sendMail({
      from: "gem.risedge@gmail.com",
      to: email,
      subject: "🎉 Registration Successful - Robozobo",

      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>Welcome to Robozobo 🚀</h2>

          <p>Hi <b>${name}</b>,</p>

          <p>Your registration has been successfully completed 🎉</p>

          <hr>

          <p><b>📘 Course:</b> ${course}</p>
          <p><b>🕒 Slot:</b> ${slot}</p>
          <p><b>🎓 Grade:</b> ${grade}</p>

          <hr>

          <p>We will contact you soon with further details.</p>

          <p style="margin-top:20px;">✨ Keep Learning & Keep Growing!</p>
        </div>
      `
    }, (error, info) => {
      if (error) {
        console.log("Email Error ❌", error.message);
      } else {
        console.log("Email sent ✅");
      }
    });

  });
};