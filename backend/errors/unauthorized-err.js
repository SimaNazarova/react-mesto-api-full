class Unauthorized extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = 401;
  }
}

module.exports = Unauthorized;
