const { BadRequest } = require("../libs/errors");

exports.createItem = async (payload) => {
  const { userId } = payload.user;
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

  const item = await itemRepository.create({
    title,
    description,
    minBidPrice,
    startTime,
    endTime,
    image: imageUrl,
    userId,
  });


  return { message: "Item created successfully" };
};

exports.listItem = async (payload) => {
  const { userId } = payload.user;
  const { title, description, minBidPrice, startTime, endTime } = payload.body;

  return { message: "Item created successfully" };
};
