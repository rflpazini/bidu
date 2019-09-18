class UserHelper {
  static isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
}

module.exports = UserHelper;
