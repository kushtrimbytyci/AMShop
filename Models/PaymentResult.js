const { DataTypes } = require("sequelize");
const db = require("../config/connectDB");

const PaymentResult = db.define("PaymentResult", {
  status: DataTypes.STRING,
  update_time: DataTypes.STRING,
  email_address: DataTypes.STRING,
});

module.exports = PaymentResult;
