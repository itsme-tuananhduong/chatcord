const AuthRouter = require("express").Router();
const AuthController = require("./auth.controller");
const isAuth = require("../shared/isAuth");

AuthRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthController.findUser({ email, password });
    res.send({ success: 1, data: user });
  } catch (err) {
    res.send({ success: 0, message: err.message });
  }
});

AuthRouter.post("/signup", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const user = await AuthController.createUser({ email, password, username });
    res.send({ success: 1, data: user });
  } catch (err) {
    res.send({ success: 0, message: err.message });
  }
});

AuthRouter.delete("/delete-account", async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);
    await AuthController.deleteUser({ id });
    res.send({ success: 1 });
  } catch (err) {
    res.send({ success: 0 });
  }
});

AuthRouter.get("/verify", isAuth, async (req, res) => {
  res.send({ success: 1, data: req.user });
});

module.exports = AuthRouter;
