const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  city: String,
  street: String,
  houseNumber: Number,
  floor: Number,
  ApartmentNumber: Number,
  admin: {
    type: Boolean,
    default: false,
  },
  confirm: {
    type: Boolean,
    default: false,
  },
  resetLink: {
    data: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
exports.UserModel = mongoose.model("users", userSchema);

////////// schema reagex Email
const emailRegExp = /^[a-z0-9\._\-\+]{2,50}@[a-z\-0-9]+(\.[a-z]{2,10})+$/i;

/////////// Schema Reagex Password
const lowerCaseRegExp = /(?=.*[a-z])/;
const upperCaseRegExp = /(?=.*[A-Z])/;
const numericRegExp = /(?=.*[0-9])/;

////////// schema reagex Phone
const phoneRegExp = /^0[2-9]\d{7,8}$/;

//// validate create user
exports.validateUser = (_user) => {
  let schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().regex(emailRegExp),
    phone: Joi.string().min(9).max(10).regex(phoneRegExp).required(),
    password: Joi.string()
      .min(6)
      .max(1024)
      .regex(lowerCaseRegExp)
      .regex(upperCaseRegExp)
      .regex(numericRegExp)
      .required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    houseNumber: Joi.number().required(),
    floor: Joi.number().required(),
    ApartmentNumber: Joi.number().required(),
  });
  return schema.validate(_user, { abortEarly: false });
};

//// validate Edit user
exports.validateEditUser = (_user) => {
  let schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    phone: Joi.string().min(9).max(10).regex(phoneRegExp).required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    houseNumber: Joi.number().required(),
    floor: Joi.number().required(),
    ApartmentNumber: Joi.number().required(),
  });
  return schema.validate(_user, { abortEarly: false });
};

/// validate change password
exports.validatePassword = (password) => {
  const schema = Joi.object({
    password: Joi.string().max(1024).required(),
    newPassword: Joi.string()
      .min(6)
      .max(1024)
      .regex(lowerCaseRegExp)
      .regex(upperCaseRegExp)
      .regex(numericRegExp)
      .required(),
  });
  return schema.validate(password);
};

///validate Email
exports.validateEmail = (_email) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().regex(emailRegExp),
  });
  return schema.validate(_email);
};

///validate Reset Password
exports.validateResetPassword = (_password) => {
  const schema = Joi.object({
    newPassword: Joi.string()
      .min(6)
      .max(1024)
      .regex(lowerCaseRegExp)
      .regex(upperCaseRegExp)
      .regex(numericRegExp)
      .required(),
    resetLink: Joi.string().required(),
  });

  return schema.validate(_password);
};
