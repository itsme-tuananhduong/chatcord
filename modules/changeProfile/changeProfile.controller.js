const UserModel = require("../auth/user");
const bcrypt = require("bcryptjs");

const updateProfile = async ({
  userSend,
  username,
  newPassword,
  avatarLink,
}) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(newPassword, salt);
  const res = await UserModel.updateOne(
    { email: userSend },
    {
      username: username,
      password: hashPassword,
      avatarLink: avatarLink,
    }
  );
  if (res.nModified) return true;
  return false;
};

module.exports = {
  updateProfile,
};
