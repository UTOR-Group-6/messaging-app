const router = require('express').Router();
const {
  getSingleUser,
  createUser,
  login,
} = require('../../controllers/user-controller');

const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, getSingleUser);

router.route('/login').post(login);

router.route('')

module.exports = router;
