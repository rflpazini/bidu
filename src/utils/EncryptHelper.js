const bcrypt = require('bcrypt');

class EncryptHelper {
  static async createHashedPassword(password) {
    return bcrypt.hash(password, 10);
  }

  static async comparePassword(hashPassword, password) {
    return bcrypt.compare(password, hashPassword);
  }
}

module.exports = EncryptHelper;
