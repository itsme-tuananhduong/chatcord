const ChangeProfileRouter = require("express").Router();
const ChangeProfileController = require("./changeProfile.controller");
const AuthController = require("../auth/auth.controller");

ChangeProfileRouter.post("/change-profile", async (req, res) => {
  try {
    const { userSend, username, newPassword, avatarLink } = req.body;
    const update = await ChangeProfileController.updateProfile({
      userSend,
      username,
      newPassword,
      avatarLink,
    });
    if (update) {
      const updated = await AuthController.findUpdated(userSend);
      res.send({ success: 1, data: updated });
    } else {
      res.send({ success: 0, message: "daynay" });
    }
  } catch (err) {
    res.send({ success: 0, message: err.message });
  }
});

module.exports = ChangeProfileRouter;
