const authService = require("../services/authentication.service");

exports.login = (req, res, next) => {
  authService.login(req, res, next);
};
