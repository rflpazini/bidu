const jwt = require('jsonwebtoken');

const config = require('../../config/')

class AuthHelper {
    static async createToken(id) {
        const token = jwt.sign({
            userId: id
          },
            process.env.SECRET || config.secret, { expiresIn: '7d' }
          );

          return token;
    }
}

module.exports = AuthHelper;