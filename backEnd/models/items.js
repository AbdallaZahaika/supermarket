const mongoose = require("mongoose");
const Joi = require("joi");

const ItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: Object,
  type: String,
  quantityInStore: Number,
  soldBy: String,
  category: String,

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  discount: {
    type: Number,
    default: 0,
  },
});

exports.ItemModel = mongoose.model("items", ItemSchema);

//// validate create Chat
exports.validateItem = (_item) => {
  let schema = Joi.object({
    name: Joi.string().min(2).max(300).required(),
    price: Joi.number().min(0.1).required(),
    description: Joi.string().min(2).max(1000),
    image: Joi.object().required(),
    type: Joi.string().required(),
    quantityInStore: Joi.number().min(1).required(),
    discount: Joi.number().min(0).max(100),
    soldBy: Joi.string().required(),
    category: Joi.string().required(),
  });
  return schema.validate(_item, { abortEarly: false });
};
//// validate create Chat
exports.validateEditItem = (_item) => {
  let schema = Joi.object({
    name: Joi.string().min(2).max(300).required(),
    price: Joi.number().min(0.1).required(),
    description: Joi.string().min(2).max(1000),
    image: Joi.object().required(),
    type: Joi.string().required(),
    quantityInStore: Joi.number().min(0).required(),
    _id: Joi.string().required(),
    discount: Joi.number().min(0).max(100),
    soldBy: Joi.string().required(),
    category: Joi.string().required(),
  });
  return schema.validate(_item, { abortEarly: false });
};
