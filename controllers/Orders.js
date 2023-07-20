const Orders = require("../models/Orders");
const csv = require("csvtojson");
const fs = require("fs");

const getAllOrders = async (req, res) => {
  try {
    // get all orders id
    const ordersID = await Orders.distinct("Order_ID");

    let i = 0;
    const orders = [];

    // get all orders
    while (i < ordersID.length) {
      const order = await Orders.find({ Order_ID: ordersID[i] });

      // total amount
      let total = 0;
      let name = "";
      let date = "";
      let orderId;
      order.forEach((item) => {
        name = item.Customer;
        date = item.Order_Date;
        orderId = item.Order_ID;
        total += item.Quantity * item.Unit_Price;
      });
      orders.push({
        order,
        name,
        orderId,
        date,
        totalAmount: total.toFixed(2),
      });
      i++;
    }

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting orders",
      error: error.message,
    });
  }
};

const uploadCSVFile = async (req, res) => {
  try {
    // convert csv file to json
    const jsonArray = await csv().fromFile(req.file.path);

    // insert all orders to database
    await Orders.insertMany(jsonArray);

    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });

    return res.status(200).json({
      success: true,
      message: "CSV file uploaded successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while uploading CSV file",
      error: error.message,
    });
  }
};

const getDataByOrderId = async (req, res) => {
  try {
    // get all orders id
    const ordersID = await Orders.distinct("Order_ID");

    let i = 0;
    const orders = [];

    // get all orders
    while (i < ordersID.length) {
      const order = await Orders.find({ Order_ID: ordersID[i] });

      // total amount
      let total = 0;
      let name = "";
      let date = "";
      let orderId;
      order.forEach((item) => {
        name = item.Customer;
        date = item.Order_Date;
        orderId = item.Order_ID;
        total += item.Quantity * item.Unit_Price;
      });
      orders.push({
        order,
        name,
        orderId,
        date,
        totalAmount: total.toFixed(2),
      });
      i++;
    }

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting orders",
      error: error.message,
    });
  }
};
module.exports = {
  getAllOrders,
  uploadCSVFile,
  getDataByOrderId,
};
