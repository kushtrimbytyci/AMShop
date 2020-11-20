const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const chalk = require("chalk");

dotenv.config({ path: path.join(__dirname, "/config/config.env") });

const app = express();
const db = require("./config/connectDB");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
const user = require("./routes/user");
app.use("/api", user);
const products = require("./routes/products");
app.use("/api/products", products);
const orders = require("./routes/orders");
app.use("/api/orders", orders);
const uploadRouter = require("./routes/uploadRoutes");
app.use("/api/upload", uploadRouter);

// Express static folder
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));



// Express error handler
app.use((err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .json({ msg: err.message || "Error handler activated" });
});


if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client","build", "index.html"));
   });
}

const PORT = process.env.PORT || 5000;
db.authenticate()
  .then(() => {
    console.log(chalk.yellow("DB connected successfully"));
    app.listen(
      PORT,
      console.log(
        chalk.yellow(
          `Server started listening in ${process.env.NODE_ENV} mode on port ${PORT}`
        )
      )
    );
  })
  .catch(() => {
    console.log(chalk.red("DB not connected"));
  });
