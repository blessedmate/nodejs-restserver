const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is mandatory"],
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: [true, "Status is mandatory"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is mandatory"],
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  description: { type: String },
  available: {
    type: Boolean,
    default: true,
  },
});

ProductSchema.methods.toJSON = function () {
  const { __v, status, ...data } = this.toObject();
  return data;
};

module.exports = model("Product", ProductSchema);
