const asyncHandler = require("../helpers/asyncHandler");
const errorHandler = require("../helpers/errorHandler");
const Products = require("../Models/Products");
const Review = require("../Models/Review");
const { Op } = require("sequelize");

// Get all products
// Method GET
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const { page } = req.query;
  let products;
  let length = await Products.findAll();
  length = length.length;

  if (!page) {
    products = await Products.findAll({
      order: [["id", "ASC"]],
      include: [{ model: Review }],
    });
  } else {
    products = await Products.findAll({
      offset: (Number(page) - 1) * 4,
      limit: 4,
    });
  }

  if (!products) {
    return next(new errorHandler("No products in your stock", 401));
  }
  res.status(200).json({ success: true, data: products, length });
});

// Get single product
// Method GET
exports.getSingleProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Products.findByPk(id, {
    include: [
      {
        model: Review,
      },
    ],
  });

  if (!product) {
    return next(
      new errorHandler(
        `Product with id ${id} doesn't exist in your database`,
        401
      )
    );
  }
  res.status(200).json({ success: true, data: product });
});

// Add a single products
// Method POST
exports.addProduct = asyncHandler(async (req, res, next) => {
  const {
    name,
    image,
    brand,
    category,
    price,
    countInStock,
    description,
  } = req.body;

  if (
    !name ||
    !image ||
    !brand ||
    !category ||
    !price ||
    !countInStock ||
    !description
  ) {
    return next(new errorHandler("Some informations are missing", 401));
  }

  await Products.create({
    name,
    image,
    brand,
    category,
    price,
    countInStock,
    description,
  });

  res.status(200).json({ success: true, data: "Product added" });
});

// Add bulk products
// Method POST
exports.addBulkProducts = asyncHandler(async (req, res, next) => {
  const products = await Products.bulkCreate(req.body);
  res.status(200).json({ success: true, data: "Products(BULK) added" });
});


// Update products
// Method PUT
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  let product = await Products.findByPk(id);
  if (!product) {
    return next(new errorHandler(`Product with id ${id} doesn't exist`, 401));
  }

  product = await Products.update(req.body, {
    where: {
      id,
    },
  });
  res.status(200).json({ success: true, data: "Product updated successfully" });
});

// Remove products
// Method DEL
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let product = await Products.findByPk(id);
  if (!product) {
    return next(new errorHandler(`Product with id ${id} doesn't exist`, 401));
  }

  product = await Products.destroy({
    where: {
      id,
    },
  });
  res.status(200).json({ success: true, data: "Product deleted successfully" });
});


exports.makeReview = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;
  const { id } = req.params;

  if (!rating) {
    return next(new errorHandler("Rating not provided", 400));
  }
  
  let product = await Products.findByPk(id, {
    include: [
      {
        model: Review,
      },
    ],
  });

  if (product) {
    if (product.Reviews !== undefined) {
      const alreadyReviewed = product.Reviews.find(
        (user) => user.UserId === req.user.id
      );
      if (alreadyReviewed) {
        return next(new errorHandler("You already reviewed this product", 400));
      }
      // For Product model
      const ratingg = ((product.rating + rating) / 2).toFixed(2);
      const numReviews = product.numReviews + 1;

      // For Review model
      const name = req.user.name;

      await Products.update({ rating: ratingg, numReviews }, { where: { id } });
      await Review.create({
        name,
        comment,
        rating,
        UserId: req.user.id,
        ProductId: product.id,
      });
      res.status(200).json({ success: true, data: product });
    } else {
      // For Product model
      const ratingg = ((product.rating + rating) / 2).toFixed(2);
      const numReviews = product.numReviews + 1;
      // For Review model
      const name = req.user.name;

      await Products.update({ rating: ratingg, numReviews }, { where: { id } });
      await Review.create({
        name,
        comment,
        rating,
        UserId: req.user.id,
        ProductId: product.id,
      });
      res.status(200).json({ success: true, data: product });
    }
  }
});

exports.searchByKeyword = asyncHandler(async (req, res, next) => {
  const { keyword } = req.query;
  if (!keyword) {
    return next(new errorHandler("Keyword missing"));
  }

  let products = await Products.findAll({
    where: {
      name: {
        [Op.iLike]: `%${keyword}%`,
      },
    },
  });

  if (products.length === 0) {
    return next(new errorHandler("Product does not exist", 400));
  }
  res.status(200).json({ success: true, data: products });
});
