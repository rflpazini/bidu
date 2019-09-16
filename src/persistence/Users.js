const sql = require('sql-template-strings');
const uuid = require('uuid/v4');
const moment = require('moment');

const db = require('./db');
const Helper = require('../utils/Helper');

class Users {
  async create(email, password) {
    try {
      const hashedPassword = await Helper.createHashedPassword(password);

      const { rows } = await db.query(sql`
      INSERT INTO users (id, email, password, created_at, updated_at)
        VALUES (${uuid()}, ${email}, ${hashedPassword}, moment(new Date()), moment(new Date()))
        RETURNING id, email;
      `);

      const [user] = rows;

      return user;
    } catch (error) {
      if (error.constraint === 'users_email_key') {
        return null;
      }

      throw error;
    }
  }

  async findByEmail(email) {
    const { rows } = await db.query(sql`
    SELECT * FROM users WHERE email=${email} LIMIT 1;
    `);
    return rows[0];
  }
}

module.exports = Users;
