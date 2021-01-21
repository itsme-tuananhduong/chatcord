const RequestRouter = require("express").Router();
const RoomController = require("../room/room.controller");

RequestRouter.post("/random-chat", async (req, res) => {
  try {
    const { userSend } = req.body;
    const randomChatRoom = await RoomController.findRandomChatRoom();

    if (randomChatRoom.length == 0) {
      const newRandomChatRoom = await RoomController.createRandomChatRoom(
        userSend
      );
      res.send({
        success: 2,
        data: { roomId: newRandomChatRoom._id, status: "waiting" },
      });
    } else {
      if (userSend === randomChatRoom[0].createdBy) {
        RoomController.deleteRandomChatRoom({ id: randomChatRoom[0]._id });
        const newRandomChatRoom = await RoomController.createRandomChatRoom(
          userSend
        );
        res.send({
          success: 2,
          data: { roomId: newRandomChatRoom._id, status: "waiting" },
        });
      } else {
        RoomController.deleteRandomChatRoom({ id: randomChatRoom[0]._id });
        res.send({
          success: 1,
          data: { roomId: randomChatRoom[0]._id, status: "joined" },
        });
      }
    }
  } catch (err) {
    res.send({ success: 0, message: err.message });
  }
});

module.exports = RequestRouter;
