const { DataTypes } = require("sequelize");
const db = require("../config/connectDB");

const Review = db.define("Review",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
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

module.exports = Review;
