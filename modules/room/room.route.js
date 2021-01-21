const RoomRouter = require("express").Router();
const RoomController = require("./room.controller");

// RoomRouter.get("/:id", (req, res) => {
//   const roomId = req.params.id;
//   res.send({ success: 1, data: `/chat.html?username=demo&room=${roomId}` });
// });

RoomRouter.get("/get-room", async (req, res) => {
  try {
    const { page, limit } = req.query;
    const pageNumber = Number(page) ? Number(page) : 1;
    const limitNumber = Number(limit) ? Number(limit) : 3;
    console.log(limit);
    const room = await RoomController.findChatRoom({
      page: pageNumber,
      limit: limitNumber,
    });
    res.send({ success: 1, data: room });
  } catch (err) {
    res.send({ success: 0, message: err.message });
  }
});

RoomRouter.get("/search-room", async (req, res) => {
  try {
    const { keyword } = req.query;
    const room = await RoomController.searchChatRoom({
      keyword,
    });
    res.send({ success: 1, data: room });
  } catch (err) {
    res.send({ success: 0, message: err.message });
  }
});

RoomRouter.post("/create-room", async (req, res) => {
  try {
    const { userSend, roomName, roomAvatar } = req.body;
    console.log(req.body);
    const chatRoom = await RoomController.createChatRoom({
      roomName,
      roomAvatar,
      createdBy: userSend,
    });
    res.send({ success: 1, data: chatRoom });
  } catch (err) {
    res.send({ success: 0, message: err.message });
  }
});

RoomRouter.delete("/delete-room", async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);
    await RoomController.deleteChatRoom({ id });
    res.send({ success: 1 });
  } catch (err) {
    res.send({ success: 0 });
  }
});

module.exports = RoomRouter;
