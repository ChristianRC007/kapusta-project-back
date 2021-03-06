const express = require('express');

const { joiUserSchema } = require('../../model/schemas');
const {
  validation,
  authentication,
  controllerWrapper,
} = require('../../middlewares');
const { users } = require('../../controllers');

const router = express.Router();

const userValidationMiddleware = validation(joiUserSchema);

router.post(
  '/signup',
  userValidationMiddleware,
  controllerWrapper(users.signup),
);

router.post('/login', userValidationMiddleware, controllerWrapper(users.login));

router.get('/current', authentication, controllerWrapper(users.current));

router.post('/logout', authentication, controllerWrapper(users.logout));

router.patch(
  '/balance',
  authentication,
  controllerWrapper(users.updateBalance),
);

module.exports = router;
