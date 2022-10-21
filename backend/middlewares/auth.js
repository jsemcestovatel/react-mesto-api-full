const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/not-authorized-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new NotAuthorizedError('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');

  // token with cookies
  // const token = req.cookies.jwt;
  // if (!token) {
  //   next(new NotAuthorizedError('Необходима авторизация'));
  //   return;
  // }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'testkey',
    );
  } catch (err) {
    next(new NotAuthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
