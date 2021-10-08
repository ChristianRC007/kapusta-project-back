const { User } = require('../../model/schemas');

const logout = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { token: null });

    res.status(204).json({
      status: 'success',
      code: 204,
      message: 'No Content',
    });
    console.log('logout');
  } catch (error) {
    next(error);
  }
};
module.exports = logout;
