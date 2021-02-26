const Unauthorized = require('./unauthorized-err');
const NotFoundError = require('./not-found-err');
const BadRequest = require('./badRequest-err');
const ForbiddenError = require('./forbidden-err');
const ConflictError = require('./conflict-err');

module.exports = {
  Unauthorized, NotFoundError, BadRequest, ForbiddenError, ConflictError,
};
