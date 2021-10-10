const { User } = require('../../model/schemas');

const logout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { token: null });

    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
module.exports = logout;
