const { DataTypes } = require("sequelize");
const db = require("../config/connectDB");
const PaymentResuls = require("./PaymentResult");
const ShippingAddress = require("./ShippingAddress");

const Orders = db.define("Orders",
  {
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taxPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    shippingPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    totalPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    paidAt: {
      type: DataTypes.DATE,
    },
    isDelivered: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    deliveredAt: {
      type: DataTypes.DATE,
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      defaultValue: Date.now,
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
      defaultValue: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

// Payment results
Orders.hasOne(PaymentResuls);
PaymentResuls.belongsTo(Orders);

// Shipping Address
Orders.hasOne(ShippingAddress);
ShippingAddress.belongsTo(Orders);

module.exports = Orders;
