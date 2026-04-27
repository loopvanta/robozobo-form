const express = require("express");
const router = express.Router();
const db = require("../db");

// GET ALL USERS
router.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error");
    }
    res.json(result);
  });
});

module.exports = router;