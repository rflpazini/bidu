const sql = require('sql-template-strings');
const uuid = require('uuid/v4');
const moment = require('moment');

const db = require('./DataBase');
const EncryptHelper = require('../utils/EncryptHelper');

class Users {
  static async create(email, password) {
    try {
      const hashedPassword = await EncryptHelper.createHashedPassword(password);

      const { rows } = await db.query(sql`
      INSERT INTO users (id, email, password, created_at, updated_at)
        VALUES (${uuid()}, ${email}, ${hashedPassword}, ${moment(
  new Date()
)}, ${moment(new Date())})
        RETURNING id, email;
      `);

      const [user] = rows;

      return user;
    } catch (error) {
      if (
        error.constraint === 'users_email_key' ||
        error.constraint === 'users_email_unique'
      ) {
        return null;
      }
      console.error(`create() >> Error: ${error.stack}`)
      throw error;
    }
  }

  static async findAll() {
    try {
      const { rows } = await db.query(sql`
    SELECT * FROM users;
    `);

      return rows;
    } catch (error) {
      console.error(`findAll() >> Error: ${error.stack}`)
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const { rows } = await db.query(sql`
    SELECT * FROM users WHERE email=${email} LIMIT 1;
    `);

      return rows[0];
    } catch (error) {
      console.error(`findByEmail() >> Error: ${error.stack}`)
      throw error;
    }
  }

  static async delete(email) {
    try {
      const { rows } = await db.query(sql`
      DELETE FROM users 
      WHERE email=${email} 
      RETURNING *;
    `);

      return rows[0];
    } catch (error) {
      console.error(`delete() >> Error: ${error.stack}`)
      throw error;
    }
  }
}

module.exports = Users;
