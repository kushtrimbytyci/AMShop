const { DataTypes } = require("sequelize");
const db = require("../config/connectDB");
const Orders = require("./Orders");
const Products = require("./Products");

const Order_products = db.define("Order_product", {
  quantity: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});

Orders.belongsToMany(Products, { through: Order_products });
Products.belongsToMany(Orders, { through: Order_products });

module.exports = Order_products;
