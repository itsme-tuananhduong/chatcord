const UserModel = require("./user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const genToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const createUser = async ({ email, password, username }) => {
  const foundUser = await UserModel.findOne({ email }).lean();
  if (foundUser) {
    throw new Error("This email has been registered");
  } else {
    if (password.length < 6) {
      throw new Error("Your password must be at least 6 characters");
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);

      const user = await UserModel.create({
        email,
        password: hashPassword,
        username,
      });
      const token = genToken(user._id);

      return { user, token };
    }
  }
};

const findUser = async ({ email, password }) => {
  const foundUser = await UserModel.findOne({ email }).lean();

  if (!foundUser) throw new Error("User is not found");

  const { password: foundPassword, ...restUser } = foundUser;

  const samePassword = bcrypt.compareSync(password, foundPassword);
  if (!samePassword) throw new Error("Wrong password");

  const token = genToken(restUser._id);

  return { user: restUser, token };
};

const findUpdated = async (email) => {
  const foundUpdated = await UserModel.findOne({ email }).lean();
  return foundUpdated;
};

const deleteUser = async ({ id }) => {
  await UserModel.deleteOne({ _id: id });
};

module.exports = {
  createUser,
  findUser,
  findUpdated,
  deleteUser,
};
