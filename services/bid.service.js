const { BadRequest } = require("../libs/errors");
const bidRepository = require("../repositories/bid.repository");
const itemRepository = require("../repositories/item.repository");
const { Bids, Users, Items } = require("../models");
const { getIO } = require("../libs/socketConnection");

exports.createBid = async (payload) => {
  const { id } = payload.user;
  const { itemId, bidAmount } = payload.body;
  if (!itemId || !bidAmount) {
    throw new BadRequest("itemId and bidAmount are required");
  }

  const item = await itemRepository.findOne({ id: itemId });
  if (!item) {
    throw new BadRequest("Item not found");
  }

  if (item.status !== "LIVE") {
    throw new BadRequest("Bids can only be placed on LIVE items");
  }
  if (bidAmount < item.minBidPrice) {
    throw new BadRequest(`Bid amount must be at least ${item.minBidPrice}`);
  }
  if (item.currentHighestBid && bidAmount <= item.currentHighestBid) {
    throw new BadRequest(
      `Bid amount must be higher than current highest bid of ${item.currentHighestBid}`,
    );
  }

  const newBid = await bidRepository.create({
    itemId,
    userId: id,
    bidAmount,
  });

  await itemRepository.update({
    payload: {
      currentHighestBid: bidAmount,
      currentWinnerId: id,
    },
    criteria: { id: itemId },
  });

  const criteria = { id: newBid.id };
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

 
  try {
    const bid = await bidRepository.findOne(criteria, include);
    const io = getIO();
    const roomName = `auction-${itemId}`;
    io.to(roomName).emit("new-bid", {
      bid: bid,
    });
    io.emit("bid-placed", { bid: bid });
    console.log(`Bid emitted to room: ${roomName}`);
  } catch (error) {
    console.error("Error emitting bid event:", error.message);
  }

  return { message: "Bid created successfully" };
};

exports.listBids = async (payload) => {
  const { itemId } = payload.query;
  const criteria = {};
  if (itemId) {
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

  const bids = await bidRepository.findAndCountAll({ criteria, include });
  return bids;
};
