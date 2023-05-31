const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
  // get single user
  async getSingleUser({ user = null, params }, res) {
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    });

    if (!foundUser) {
      return res.status(400).json({ message: 'Sorry, no user was found!' });
    }
    res.json(foundUser);
  },

  // create user
  async createUser({ body }, res) {
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: 'Sorry, could not create user!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  // login user
  async login({ body }, res) {
    const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const pwValidate = await user.isCorrectPassword(body.password);

    if (!pwValidate) {
      return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  

  
}