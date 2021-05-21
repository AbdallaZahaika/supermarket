const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  ItemModel,
  validateItem,
  validateEditItem,
} = require("../models/items");

router.get("/", async (req, res) => {
  /// perPage
  let perPage = req.query.perPage ? req.query.perPage : 30;
  /// page
  let page = req.query.page ? req.query.page * perPage : 0;
  /// name
  let nameQ = req.query.name;
  /// The RegExp is used to perform case-insensitive matching and if the value not 100% matching.
  let expNameQ = new RegExp(nameQ, "i");
  // type
  let typeQ = req.query.type;
  let categoryQ = req.query.category ? req.query.category : { $exists: true };
  /// minPrice
  let minPriceQ = req.query.minPrice ? req.query.minPrice : 1;
  /// maxPrice
  let maxPriceQ = req.query.maxPrice ? req.query.maxPrice : 999999999;
  let sort = req.query.sort === "Cheap" ? 1 : -1;
  /// price
  let price =
    minPriceQ && maxPriceQ
      ? { $gte: minPriceQ, $lte: maxPriceQ }
      : { $exists: true };

  try {
    const data = await ItemModel.find({
      type: typeQ,
      name: expNameQ ? expNameQ : { $exists: true },
      price: price,
      category: categoryQ,
    }).sort({ price: [sort] });

    res.json({
      pages: Math.ceil(data.length / perPage),
      data: data.splice(page, perPage),
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/items-name", async (req, res) => {
  let type = req.query.type;
  let category = req.query.category ? req.query.category : { $exists: true };
  try {
    const data = await ItemModel.find({ type, category }, { name: 1, _id: 0 });
    const names = data.map((item) => item.name);
    res.json(names);
  } catch (errors) {
    res.status(400).json({ errors });
  }
});
router.post("/", auth, async (req, res) => {
  const { error } = validateItem(req.body);
  if (error) {
    const listErrors = {};
    for (const detail of error.details) {
      listErrors[detail.path[0]] = detail.message;
    }
    return res.status(400).send({
      errors: listErrors,
    });
  }

  try {
    if (req.userToken.admin === false) {
      return res.status(400).json({ errors: "you are not admin!" });
    }
    const data = await ItemModel.insertMany(req.body);
    res.json(data);
  } catch (errors) {
    res.status(400).json({ errors });
  }
});

router.get("/item/:_id", async (req, res) => {
  const _id = req.params._id;
  try {
    const data = await ItemModel.findOne(
      { _id },
      {
        image: 1,
        name: 1,
        description: 1,
        price: 1,
        _id: 1,
        type: 1,
        quantityInStore: 1,
        discount: 1,
        soldBy: 1,
        category: 1,
      }
    );
    return res.json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/", auth, async (req, res) => {
  const { error } = validateEditItem(req.body);
  if (error) {
    const listErrors = {};
    for (const detail of error.details) {
      listErrors[detail.path[0]] = detail.message;
    }
    return res.status(400).send({
      errors: listErrors,
    });
  }
  try {
    if (req.userToken.admin === false) {
      return res.status(400).json({ errors: "you are not admin!" });
    }
    const data = await ItemModel.updateOne({ _id: req.body._id }, req.body);
    res.json(data);
  } catch (errors) {
    res.status(400).json({ errors });
  }
});

router.delete("/:_id", auth, async (req, res) => {
  try {
    const _id = req.params._id;
    if (req.userToken.admin === false) {
      return res.status(400).json({ errors: "you are not admin!" });
    }
    const data = await ItemModel.deleteOne({ _id });
    if (data.n === 1) {
      return res.json("deleted");
    }
    res.json("item is not exact");
  } catch (errors) {
    res.status(400).json({ errors });
  }
});

module.exports = router;
