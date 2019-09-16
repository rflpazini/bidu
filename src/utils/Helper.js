const bcrypt = require('bcrypt');

class Helper {
  static createHashedPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }
}

module.exports = Helper;
