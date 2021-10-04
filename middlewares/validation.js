const { httpCodes } = require('../helpers/httpCodes');

const validation = schema => {
  const validFunc = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(httpCodes.BAD_REQUEST).json({
        message: error.message,
      });
    }
    next();
  };

  return validFunc;
};

module.exports = validation;
