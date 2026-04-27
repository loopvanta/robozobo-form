
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

// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());

// const registerRoute = require("./routes/register");
// app.use("/register", registerRoute);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT} 🚀`);
// });

// const adminRoutes = require("./routes/admin");
// app.use("/admin", adminRoutes);


const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
const registerRoute = require("./routes/register");
app.use("/register", registerRoute);

const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);

// PORT FIX
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});