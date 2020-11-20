const User = require("../Models/User");
const errorHandler = require("../helpers/errorHandler");
const asyncHandler = require("../helpers/asyncHandler");
const jwt = require("jsonwebtoken");

exports.register = asyncHandler(async (req, res, next) => {
  const { name, password, email, role } = req.body;
  if (!name || !password || !email) {
    return next(new errorHandler("Missing infos to register", 401));
  }

  let user = await User.findOne({
    where: {
      email,
    },
  });

  if (user) {
    return next(new errorHandler("Username already registered", 401));
  }

  user = await User.create({ name, email, password, role });
  user["dataValues"].password = undefined;
  sendTokenResponse(user, 200, res);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new errorHandler("Email or password is missing", 401));
  }

  const user = await User.findOne({
    where: {
      email,
    },
    attributes: {
      include: ["password"],
    },
  });

  if (!user) {
    return next(new errorHandler("User not found", 401));
  }

  const passwordMatch = await user.isMatch(password);
  if (!passwordMatch) {
    return next(new errorHandler("Wrong password", 401));
  }
  delete user.dataValues["password"];
  sendTokenResponse(user, 200, res);
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { email, role, name } = req.body;

  // Number(id) should be used because id is a string and req.user.id is a number
  if (Number(id) !== req.user.id && req.user.role !== "admin") {
    return next(new errorHandler("Permission denied", 403));
  }

  let user = await User.findByPk(id);
  if (!user) {
    return next(new errorHandler("User does not exist", 401));
  }
  user = await User.update(
    { email, name, role },
    {
      where: {
        id,
      },
    }
  );

  res.status(200).json({ success: true, data: "User updated successfully" });
});


exports.getMe = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, data: req.user });
});


// Only admin allowed on this route
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.findAll();
  res.status(200).json({ success: true, data: users });
});

// Only admin allowed on this route
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return next(new errorHandler("User does not exist", 401));
  }
  await User.destroy({
    where: {
      id,
    },
  });
  res.status(200).json({ success: true, data: "User removed successfully" });
});


const sendTokenResponse = (user, statusCode, res) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  res.status(statusCode).json({ success: true, token, user });
};
