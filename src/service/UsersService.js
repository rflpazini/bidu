const Users = require('../persistence/Users');
const UserHelper = require('../utils/UserHelper');

class UsersService {
  static async create(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        console.info(`validadeUser(${email}) >> Error: email or password null`);

        return res
          .status(400)
          .json({ message: 'Email and password must be provided' });
      }

      if (!UserHelper.isValidEmail(email)) {
        console.info(`validadeUser(${email}) >> Error: Invalid email`);

        return res.status(400).json({
          message: `Please provide a valid email...`,
        });
      }

      const user = await Users.create(email, password);
      if (!user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      return res.status(201).json(user);
    } catch (error) {
      console.error(`createUser() >> Error: ${error.stack}`);

      return res
        .status(500)
        .json({ message: `Error on trying to create a user` });
    }
  }

  static async findByEmail(req, res, next) {
    try {
      const email = req.query.email;

      const user = await Users.findByEmail(email);
      if (!user) {
        return res.status(404).json({ message: `User ${email} not found...` });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(
        `findByEmail({ email: ${req.query.email} }) >> Error: ${error.stack}`
      );

      return res
        .status(400)
        .json({ message: `Error when try to search user: ${error}` });
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

  static async deleteUser(req, res, next) {
    try {
      const users = await Users.delete(req.body.email);

      res.status(200).json(users);
    } catch (error) {
      console.error(`delete(${req.body.email}) >> Error: ${error.stack}`);

      return res.status(404).json({
        message: `Error on trying to delete user ${req.body.email} >> Error: ${error}`,
      });
    }
  }
}

module.exports = UsersService;
