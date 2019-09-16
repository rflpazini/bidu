const createError = require('http-errors');

const Users = require('../persistence/Users');

class UsersService {
  static async create(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: 'email and password must be provided' });
      }

      const user = await Users.create(email, password);
      if (!user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      return res.status(201).json(user);
    } catch (error) {
      console.error(
        `createUser({ email: ${req.body.email} }) >> Error: ${error.stack}`
      );

      res
        .status(500)
        .json({ message: `Error on trying to create user: ${req.body.email}` });
    }
  }

  static async findByEmail(req, res, next) {
    try {
      const user = await Users.findByEmail(req.query.email);
      if (!user) {
        return res
          .status(404)
          .json({
            message: `Error on trying to search user: ${req.query.email}`,
          });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(
        `findByEmail({ email: ${req.body.email} }) >> Error: ${error.stack}`
      );

      return res
        .status(400)
        .json({ message: `Error when try to searching for user: ${error}` });
    }
  }

  static async findAll(req, res, next) {
    try {
      const users = await Users.findAll();

      res.status(200).json(users);
    } catch (error) {
      console.error(`findAll() >> Error: ${error.stack}`);

      return res
        .status(404)
        .json({ message: `Error on searching users: ${error}` });
    }
  }

  static async delete(req, res, next) {
    try {
        const users = await Users.delete(req.body.email);
  
        res.status(200).json(users);
      } catch (error) {
        console.error(`delete(${req.body.email}) >> Error: ${error.stack}`);
  
        return res
          .status(404)
          .json({ message: `Error on trying to delete user ${req.body.email} >> Error: ${error}` });
      }
  }
}

module.exports = UsersService;
