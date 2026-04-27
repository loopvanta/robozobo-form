
// const express = require("express");
// const cors = require("cors");

// require("./db");

// const app = express();

// app.use(express.json());
// app.use(cors());


// const registerRoute = require("./routes/register");

// app.use("/register", registerRoute);

// app.listen(5000, () => {
//   console.log("Server running on port 5000 🚀");
// });

// const express = require("express");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const registerRoute = require("./routes/register");
// app.use("/register", registerRoute);

// app.listen(5000, ()=>console.log("Server running 🚀"));

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const registerRoute = require("./routes/register");
app.use("/register", registerRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});

const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);