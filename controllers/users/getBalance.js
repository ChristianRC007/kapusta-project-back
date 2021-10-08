// const { User } = require('../../model/schemas');

// const getBalance = async (req, res, next) => {
//   try {
//     const { _id } = req.user._id;
//     const user = await User.findById(_id);
//     if (!user) {
//       throw new NotFound();
//     }
//     res.json({
//       status: 'success',
//       code: 200,
//       balance: user.balance,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = getBalance;
