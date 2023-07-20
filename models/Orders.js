const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  Order_ID: {
    type: Number,
    required: true,
  },
  Customer: {
    type: String,
    required: true,
  },
  Order_Date: {
    type: Date,
    required: true,
  },
  Item_Name: {
    type: String,
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
  },
  Unit_Price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Orders", orderSchema);
