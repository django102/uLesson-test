const UserService = require('../services/UserService');

const UserController = {
   register: async (req, res) => await UserService.register(req, res),
   login: async (req, res) => await UserService.login(req, res),
   getProfile: async (req, res) => await UserService.getProfile(req, res),
   updateProfile: async (req, res) => await UserService.updateProfile(req, res),
};

module.exports = UserController;
