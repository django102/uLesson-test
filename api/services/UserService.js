const { UserRepository } = require('../repositories');
const ResponseService = require('./ResponseService');
const ValidationService = require('./ValidationService');
const ConfigService = require('./ConfigService');
const { ResponseStatus } = ConfigService.constants;

const UserService = {
   async register({ body }, res) {
      try {
         const { value: user, error } = ValidationService.validateUser(body);
         if (error) {
            return ResponseService.json(ResponseStatus.BAD_REQUEST, res, error.message);
         }

         const registeredUser = await UserRepository.upsert(user);
         return ResponseService.json(ResponseStatus.OK, res, 'User registration successful', registeredUser);
      } catch (err) {
         ResponseService.handleError(res, err);
      }
   },

   async login({ body }, res) {
      try {
         if (!body || !body.username || !body.password) {
            return ResponseService.json(ResponseStatus.BAD_REQUEST, res, 'Username and Password are required');
         }

         const users = await UserRepository.findByUsernameOrEmail(body.username);
         if (!users || !users.length) {
            return ResponseService.json(ResponseStatus.UNAUTHORIZED, res, 'Invalid username or password');
         }

         users.forEach((user) => {
            if (user.password === body.password) {
               // TODO:
               // generate JWT with user password as secret
               // add JWT to user object, and return in the response

               UserRepository.removeSensitiveData(user);
               return ResponseService.json(ResponseStatus.OK, res, 'Login successful', user);
            }
         });
      } catch (err) {
         ResponseService.handleError(res, err);
      }
   },

   async getProfile({ params }, res) {
      try {
         const userId = params.id;
         if (!userId) {
            return ResponseService.json(ResponseStatus.BAD_REQUEST, res, 'User Id is required');
         }

         const user = await UserRepository.findById(userId, true);
         if (!user) {
            return ResponseService.json(ResponseStatus.NOT_FOUND, res, 'User not found');
         }

         return ResponseService.json(ResponseStatus.OK, res, 'User retrieved successfully', user);
      } catch (err) {
         ResponseService.handleError(res, err);
      }
   },

   async updateProfile({ body, params }, res) {
      try {
         const { value: updateData, error } = ValidationService.validateUser(body);
         if (error) {
            return ResponseService.json(ResponseStatus.BAD_REQUEST, res, error.message);
         }

         const user = await UserRepository.findById(params.id, true);
         if (!user) {
            return ResponseService.json(ResponseStatus.NOT_FOUND, res, 'User not found');
         }

         const updatedUser = await UserRepository.upsert(user, updateData);
         return ResponseService.json(ResponseStatus.OK, res, 'User profile update successful', updatedUser);
      } catch (err) {
         ResponseService.handleError(res, err);
      }
   },
};

module.exports = UserService;
