const bcrypt = require('bcrypt');

class EncryptHelper {
  static async createHashedPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  static async comparePassword(hashPassword, password) {
    return await bcrypt.compare(password, hashPassword);
  }
}

module.exports = EncryptHelper;
