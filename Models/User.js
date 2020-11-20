const { DataTypes } = require("sequelize");
const db = require("../config/connectDB");
const bcrypt = require("bcryptjs");
const Orders = require("../Models/Orders");
const Review = require("./Review");

const User = db.define("User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["password"],
      },
    },
  }
);

User.beforeSave(async (user, options) => {
  if (!user.changed("password")) {
    return null;
  } else {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

User.prototype.isMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
};

User.hasMany(Orders);
Orders.belongsTo(User);

User.hasOne(Review);
Review.belongsTo(User);

module.exports = User;
