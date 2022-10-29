const jwt = require('jsonwebtoken');
const AuthorizedError = require('../errors/AuthorizedError');
const { NODE_ENV, JWT_SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  console.log('NODE_ENV: ', NODE_ENV);
  console.log('JWT_SECRET_KEY: ', JWT_SECRET_KEY);

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_KEY : 'dev-secret');
  } catch (err) {
    throw new AuthorizedError('Необходима авторизация');
  }

  req.user = payload;
  next();
};
