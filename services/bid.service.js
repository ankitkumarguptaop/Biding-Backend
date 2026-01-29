const { BadRequest } = require("../libs/errors");
const bidRepository = require("../repositories/bid.repository");
const itemRepository = require("../repositories/item.repository");
const { Bids, Users ,Items } = require("../models");


exports.createBid = async (payload) => {
  const { id } = payload.user;
  const { itemId, bidAmount } = payload.body;
  if(!itemId || !bidAmount){
    throw new BadRequest("itemId and bidAmount are required");
  }

  const item = await itemRepository.findOne({ id: itemId });
  if(!item){
    throw new BadRequest("Item not found");
  }
  
  if(item.status !== "LIVE"){
    throw new BadRequest("Bids can only be placed on LIVE items");
  }
  if(bidAmount < item.minBidPrice){
    throw new BadRequest(`Bid amount must be at least ${item.minBidPrice}`);
  }
  if(item.currentHighestBid && bidAmount <= item.currentHighestBid){
    throw new BadRequest(`Bid amount must be higher than current highest bid of ${item.currentHighestBid}`);
  }
  
  await bidRepository.create({
    itemId,
    userId: id,
    bidAmount,
  });
  await itemRepository.update({ payload : {
    currentHighestBid: bidAmount,
    currentWinnerId: id,
  } , criteria: { id: itemId } });

  return { message: "Bid created successfully" };
};

exports.listBids = async (payload) => {
  const { itemId } = payload.query;
  const criteria = {};
  if(itemId){
    criteria.itemId = itemId;
  }
  const include = [
    {
      model: Items,
      as: "item",
    },
    {
      model: Users,
      as: "user",
      attributes: ["id", "name", "email"],
    },
  ];

  const bids = await bidRepository.findAndCountAll({ criteria ,include });
  return bids;
}