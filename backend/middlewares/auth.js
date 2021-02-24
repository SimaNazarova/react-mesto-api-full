const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const bearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized('Проблема с токеном');
  }

  const token = bearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`);
  } catch (err) {
    throw new Unauthorized('Необходима авторизация');
  }

  req.user = payload;

  next();
};