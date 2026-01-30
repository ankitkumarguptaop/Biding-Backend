const { or, Op } = require("sequelize");
const { uploadToCloudinary } = require("../configs/cloudinary");
const { BadRequest } = require("../libs/errors");
const { Bids, Users } = require("../models");
const itemRepository = require("../repositories/item.repository");
const { getIO } = require("../libs/socketConnection");

exports.createItem = async (payload) => {
  const { id } = payload.user;
  const { title, description, minBidPrice, startTime, endTime } = payload.body;

  let imageUrl = null;
  if (payload?.file) {
    try {
      const result = await uploadToCloudinary(payload.file.buffer);
      imageUrl = result.secure_url;
    } catch (error) {
      throw new BadRequest("Failed to upload image: " + error.message);
    }
  }

  await itemRepository.create({
    title,
    description,
    minBidPrice,
    startTime,
    endTime,
    image: imageUrl,
    createdBy: id,
  });

  return { message: "Item created successfully" };
};

exports.listItem = async (payload) => {
  const { status , search } = payload.query;

  const criteria = {};
  if (status && ["UPCOMING", "LIVE", "CLOSED", "EXPIRED"].includes(status)) {
    criteria.status = status;
  }

  if( search ){
    criteria.title = { [Op.iLike]: `%${search}%` };
  }
  const include = [
    {
      model: Users,
      as: "currentWinner",
      attributes: ["id", "name", "email"],
    },
    {
      model: Users,
      as: "creator",
      attributes: ["id", "name", "email"],
    },
  ];

  const items = await itemRepository.findAndCountAll({ criteria , include });
  return items;
};

exports.getItem = async (payload) => {
  const { id } = payload.params;

  const item = await itemRepository.findOne(
    { id },
    [
      {
        model: Bids,
        as: "bids",
        include: [
          {
            model: Users,
            as: "user",
            attributes: ["id", "name", "email"],
          },
        ],
      },
      {
        model: Users,
        as: "currentWinner",
        attributes: ["id", "name", "email"],
      },
      {
        model: Users,
        as: "creator",
        attributes: ["id", "name", "email"],
      },
    ],
    {},
    {
      order: [[{ model: Bids, as: "bids" }, "createdAt", "DESC"]],
    },
  );
  return item;
};

exports.changeItemStatus = async () => {
  const now = new Date();
  const updatedItems = await itemRepository.update({
    payload: { status: "LIVE" },
    criteria: {
      status: or(["UPCOMING"]),
      startTime: { [Op.lt]: now },
    },
   options: { returning: true },
  });
  if (updatedItems[0] > 0) {
    updatedItems[1].forEach((item) => {
      console.log(item)
      getIO().emit("item-status-changed", { itemId: item.id, status: "LIVE" });
    });
  }

  const closedItems = await itemRepository.update({
    payload: { status: "CLOSED" },
    criteria: {
      status: or(["LIVE"]),
      endTime: { [Op.lt]: now },
    },
   options: { returning: true },
  });
  if (closedItems[0] > 0) {
    closedItems[1].forEach((item) => {
      getIO().emit("item-status-changed", {
        itemId: item.id,
        status: "CLOSED",
      });
    });
  }
  return { message: "Item status updated successfully" };
};
