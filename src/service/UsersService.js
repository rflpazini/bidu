const Users = require('../persistence/Users');
const UserHelper = require('../utils/UserHelper');

class UsersService {
  static async create(req, res, next) {
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
  }

  static async findByEmail(req, res, next) {
      const email = req.query.email;

      const user = await Users.findByEmail(email);
      if (!user) {
        return res.status(404).json({ message: `User ${email} not found...` });
      }

      return res.status(200).json(user);
  }

  static async findAll(req, res, next) {
      const users = await Users.findAll();

      return res.status(200).json(users);
  }

  static async deleteUser(req, res, next) {
    const email = req.body.email;

    const user = await Users.delete(email);
    if (!user) {
      return res.status(404).json({ message: `User ${email} not found...` });
    }

    return res.status(200).json(user);
  }
}

module.exports = UsersService;
