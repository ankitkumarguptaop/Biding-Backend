const { uploadToCloudinary } = require("../configs/cloudinary");
const { BadRequest } = require("../libs/errors");
const itemRepository = require("../repositories/item.repository");
const { Bids, Users } = require("../models");

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
  const { status } = payload.query;
  const items = await itemRepository.findAndCountAll({ status });
  return items;
};

exports.getItem = async (payload) => {
  const { id } = payload.params;

  const item = await itemRepository.findOne({ id }, [
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
  ]);
  return item;
};
