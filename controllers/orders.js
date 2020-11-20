const errorHandler = require("../helpers/errorHandler");
const asyncHandler = require("../helpers/asyncHandler");
const Orders = require("../Models/Orders");
const Order_products = require("../Models/Order_products");
const PaymentResult = require("../Models/PaymentResult");
const ShippingAddress = require("../Models/ShippingAddress");
const Products = require("../Models/Products");
const User = require("../Models/User");

// Create order
exports.createOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems) {
    return next(new errorHandler("No order items", 400));
  }
  const order = await Orders.create({
    UserId: req.user.id,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid: true,
    paidAt: Date.now(),
  });

  await ShippingAddress.create({
    OrderId: order.id,
    address: shippingAddress.address,
    city: shippingAddress.city,
    country: shippingAddress.country,
    postalCode: shippingAddress.postalCode,
  });

  await PaymentResult.create({ OrderId: order.id, status: "not paid" });

  for (let i = 0; i < orderItems.length; i++) {
    try {
      await Order_products.create({
        OrderId: order.id,
        ProductId: orderItems[i].id,
        quantity: orderItems[i].quantity,
      });
    } catch (error) {
      console.log(error);
    }
  }

  res.status(201).json({ success: true, id: order.id });
});

exports.getOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const order = await Orders.findByPk(id, {
    include: [
      {
        model: ShippingAddress,
      },
      {
        model: PaymentResult,
      },
      {
        model: Products,
      },
    ],
  });
  if (!order) {
    return next(new errorHandler("Order does not exist", 401));
  }
  if (req.user.id !== order.UserId) {
    return next(new errorHandler("Not your order!!", 403));
  }
  res.status(200).json({ success: true, data: order });
});

// Get all User Orders
exports.getUserOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (Number(id) !== req.user.id && req.user.role !== "admin") {
    return next(new errorHandler("Not allowed!", 401));
  }

  const order = await Orders.findAll({
    where: {
      UserId: id,
    },
    include: [
      {
        model: ShippingAddress,
      },
      {
        model: PaymentResult,
      },
      {
        model: Products,
      },
    ],
  });

  if (order.length === 0) {
    return next(new errorHandler("User has no orders", 401));
  }
  res.status(200).json({ success: true, data: order });
});

exports.adminOrders = asyncHandler(async (req, res, next) => {
  const orders = await Orders.findAll({
    where: {
      isDelivered: false,
    },
    include: [
      {
        model: User,
      },
    ],
  });
  if (!orders) {
    return next(new errorHandler("No orders", 400));
  }
  res.status(200).json({ success: true, data: orders });
});

exports.markOrderDelivered = asyncHandler(async (req, res, next) => {
  const { id } = req.query;
  const order = await Orders.findByPk(id);

  if (!order) {
    return next(new errorHandler("No order with that id found", 401));
  }

  await Orders.update(
    { isDelivered: true },
    {
      where: {
        id,
      },
    }
  );
  res.status(200).json({ success: true, data: "Delivered" });
});
