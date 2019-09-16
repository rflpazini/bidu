const bcrypt = require('bcrypt');

class Helper {
  static async createHashedPassword(password) {
    return bcrypt.hash(password, 10);
  }

  static async comparePassword(hashPassword, password) {
    return bcrypt.compare(password, hashPassword);
  }
}

module.exports = Helper;
