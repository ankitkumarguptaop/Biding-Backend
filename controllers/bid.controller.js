const { bidService } = require("../services");



exports.createBid= async (req, res, next) => {
  try {
    await bidService.createBid(req);
    res.status(201).json({ message: "Bid created successfully" });
  } catch (error) {
    next(error);
  }
};

exports.listBids = async (req, res, next) => {
  try {
    const bids = await bidService.listBids(req);
    res.status(200).json(bids);
  } catch (error) {
    next(error);
  }
};