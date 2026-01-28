const { itemService } = require("../services");

exports.createItem = async (req, res, next) => {
  try {
    await itemService.createItem(req);
    res.status(201).json({ message: "Item created successfully" });
  } catch (error) {
    next(error);
  }
};

exports.listItems = async (req, res, next) => {
  try {
    const response = await itemService.listItem(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};


exports.getItem = async (req, res, next) => {
  try {
    const response = await itemService.getItem(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};