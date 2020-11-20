const { DataTypes } = require("sequelize");
const db = require("../config/connectDB");

const ShippingAddress = db.define("ShippingAddress", {
  address: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING, allowNull: false },
  postalCode: { type: DataTypes.STRING, allowNull: false },
  country: { type: DataTypes.STRING, allowNull: false },
});

module.exports = ShippingAddress;
