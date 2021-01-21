const jwt = require('jsonwebtoken');
const UserModel = require('../auth/user');

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) throw new Error('jwt required');
    
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = data;
    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
      throw new Error('Not found user');
    }

    req.user = foundUser;
    next();
  } catch (err) {
    res.status(401).send({ success: 0, message: err.message || 'Unauth'});
  }
}

module.exports = isAuth;