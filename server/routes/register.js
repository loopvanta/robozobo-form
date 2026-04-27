// const express = require("express");
// const router = express.Router();

// const registerController = require("../controllers/registerController");

// router.post("/", registerController.registerUser);

// module.exports = router;

const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/registerController");

// ✅ ONLY POST route needed
router.post("/", registerUser);

module.exports = router;
