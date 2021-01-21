const RoomModel = require("./room");

const createRandomChatRoom = async (id) => {
  const room = await RoomModel.create({ type: "random-chat", createdBy: id });
  return room;
};

const findRandomChatRoom = async () => {
  const foundRoom = await RoomModel.find({ type: "random-chat" }).lean();
  return foundRoom;
};

const deleteRandomChatRoom = async ({ id }) => {
  await RoomModel.deleteOne({ _id: id });
};

const createChatRoom = async ({ roomName, roomAvatar, createdBy }) => {
  const room = await RoomModel.create({
    roomName,
    roomAvatar,
    type: "chat-room",
    createdBy,
  });
  console.log(room);
  return room;
};

const findChatRoom = async ({ page, limit }) => {
  const offset = (page - 1) * limit;
  const foundRoom = await RoomModel.find({ type: "chat-room" })
    .skip(offset)
    .limit(limit)
    .sort({ createdAt: -1 });
  const total = await RoomModel.find().count();
  return { data: foundRoom, total };
};

const searchChatRoom = async ({ keyword }) => {
  const foundRoom = await RoomModel.find({
    roomName: keyword,
    type: "chat-room",
  });
  return foundRoom;
};

const deleteChatRoom = async ({ id }) => {
  await RoomModel.deleteOne({ _id: id });
};

module.exports = {
  createRandomChatRoom,
  findRandomChatRoom,
  deleteRandomChatRoom,
  createChatRoom,
  findChatRoom,
  deleteChatRoom,
  searchChatRoom,
};
