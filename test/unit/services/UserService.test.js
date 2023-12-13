const sinon = require('sinon');
const { UserService, ResponseService, ValidationService, ConfigService } = require('../../../api/services');
const { UserRepository } = require('../../../api/repositories');

describe('UserService', () => {
   let userRepositoryStub;
   let responseServiceStub;
   let validationServiceStub;
   let res;

   beforeEach(() => {
      userRepositoryStub = sinon.stub(UserRepository);
      responseServiceStub = sinon.stub(ResponseService);
      validationServiceStub = sinon.stub(ValidationService);

      res = {
         status: sinon.stub().returnsThis(),
         json: sinon.stub(),
      };
   });

   afterEach(() => {
      sinon.restore();
   });

   describe('register', () => {
      it('should register a user and return a successful response', async () => {
         const body = {
            userName: 'john_doe',
            password: 'password123',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '12345678901',
            userRole: 'student',
         };

         const validatedUser = { value: body };
         const upsertedUser = { ...body, id: 1 };

         validationServiceStub.validateUser.returns(validatedUser);
         userRepositoryStub.upsert.resolves(upsertedUser);

         await UserService.register({ body }, res);

         sinon.assert.calledOnceWithExactly(validationServiceStub.validateUser, body);
         sinon.assert.calledOnceWithExactly(userRepositoryStub.upsert, validatedUser.value);
         sinon.assert.calledOnceWithExactly(
            responseServiceStub.json,
            ConfigService.constants.ResponseStatus.OK,
            res,
            'User registration successful',
            upsertedUser,
         );
      });

      it('should handle validation error and return a bad request response', async () => {
         const body = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '12345678901',
            userRole: 'USEROLE',
         };

         const validatedUser = { error: { message: 'Validation Error' } };

         validationServiceStub.validateUser.returns(validatedUser);

         await UserService.register({ body }, res);

         sinon.assert.calledOnceWithExactly(validationServiceStub.validateUser, body);
         sinon.assert.calledOnceWithExactly(
            responseServiceStub.json,
            ConfigService.constants.ResponseStatus.BAD_REQUEST,
            res,
            validatedUser.error.message,
         );
      });

      it('should handle repository error and return an error response', async () => {
         const body = {
            userName: 'john_doe',
            password: 'password123',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '12345678901',
            userRole: 'USER',
         };

         const validatedUser = { value: body };
         const repositoryError = new Error('Repository error');

         validationServiceStub.validateUser.returns(validatedUser);
         userRepositoryStub.upsert.rejects(repositoryError);

         await UserService.register({ body }, res);

         sinon.assert.calledOnceWithExactly(validationServiceStub.validateUser, body);
         sinon.assert.calledOnceWithExactly(userRepositoryStub.upsert, validatedUser.value);
         sinon.assert.calledOnceWithExactly(responseServiceStub.handleError, res, repositoryError);
      });
   });

   describe('login', () => {
      it('should handle login with valid credentials and return a successful response', async () => {
         const requestBody = {
            username: 'john_doe',
            password: 'password123',
         };

         const users = [
            {
               id: 1,
               userName: 'john_doe',
               password: 'password123',
               firstName: 'John',
               lastName: 'Doe',
               email: 'john.doe@example.com',
               phone: '12345678901',
               userRole: 'USER',
            },
         ];

         userRepositoryStub.findByUsernameOrEmail.resolves(users);

         await UserService.login({ body: requestBody }, res);

         sinon.assert.calledOnceWithExactly(userRepositoryStub.findByUsernameOrEmail, requestBody.username);
         sinon.assert.calledOnceWithExactly(
            responseServiceStub.json,
            ConfigService.constants.ResponseStatus.OK,
            res,
            'Login successful',
            users[0],
         );
      });

      it('should handle login with invalid credentials and return an unauthorized response', async () => {
         const requestBody = {
            username: 'john_doe',
            password: 'wrong_password',
         };

         userRepositoryStub.findByUsernameOrEmail.resolves([]);

         await UserService.login({ body: requestBody }, res);

         sinon.assert.calledOnceWithExactly(userRepositoryStub.findByUsernameOrEmail, requestBody.username);
         sinon.assert.calledOnceWithExactly(
            responseServiceStub.json,
            ConfigService.constants.ResponseStatus.UNAUTHORIZED,
            res,
            'Invalid username or password',
         );
      });

      it('should handle login with incomplete request and return a bad request response', async () => {
         const requestBody = {
            username: 'john_doe',
         };

         userRepositoryStub.findByUsernameOrEmail.resolves([]);

         await UserService.login({ body: requestBody }, res);

         sinon.assert.notCalled(userRepositoryStub.findByUsernameOrEmail);
         sinon.assert.calledOnceWithExactly(
            responseServiceStub.json,
            ConfigService.constants.ResponseStatus.BAD_REQUEST,
            res,
            'Username and Password are required',
         );
      });

      it('should handle repository error and return an error response', async () => {
         const requestBody = {
            username: 'john_doe',
            password: 'password123',
         };

         const repositoryError = new Error('Repository error');

         userRepositoryStub.findByUsernameOrEmail.rejects(repositoryError);

         await UserService.login({ body: requestBody }, res);

         sinon.assert.calledOnceWithExactly(userRepositoryStub.findByUsernameOrEmail, requestBody.username);
         sinon.assert.calledOnceWithExactly(responseServiceStub.handleError, res, repositoryError);
      });
   });

   describe('getProfile', () => {
      it('should get user profile by ID and return a successful response', async () => {
         const userId = 1;

         const user = {
            id: userId,
            userName: 'john_doe',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '12345678901',
            userRole: 'USER',
         };

         userRepositoryStub.findById.resolves(user);

         await UserService.getProfile({ params: { id: userId } }, res);

         sinon.assert.calledOnceWithExactly(userRepositoryStub.findById, userId, true);
         sinon.assert.calledOnceWithExactly(
            responseServiceStub.json,
            ConfigService.constants.ResponseStatus.OK,
            res,
            'User retrieved successfully',
            user,
         );
      });

      it('should handle invalid user ID and return a bad request response', async () => {
         await UserService.getProfile({ params: {} }, res);

         sinon.assert.notCalled(userRepositoryStub.findById);
         sinon.assert.calledOnceWithExactly(
            responseServiceStub.json,
            ConfigService.constants.ResponseStatus.BAD_REQUEST,
            res,
            'User Id is required',
         );
      });

      it('should handle user not found and return a not found response', async () => {
         const userId = 1;

         userRepositoryStub.findById.resolves(null);

         await UserService.getProfile({ params: { id: userId } }, res);

         sinon.assert.calledOnceWithExactly(userRepositoryStub.findById, userId, true);
         sinon.assert.calledOnceWithExactly(
            responseServiceStub.json,
            ConfigService.constants.ResponseStatus.NOT_FOUND,
            res,
            'User not found',
         );
      });

      it('should handle repository error and return an error response', async () => {
         const userId = 1;
         const repositoryError = new Error('Repository error');

         userRepositoryStub.findById.rejects(repositoryError);

         await UserService.getProfile({ params: { id: userId } }, res);

         sinon.assert.calledOnceWithExactly(userRepositoryStub.findById, userId, true);
         sinon.assert.calledOnceWithExactly(responseServiceStub.handleError, res, repositoryError);
      });
   });

   describe('updateProfile', () => {
      it('should update user profile and return a successful response', async () => {
         const userId = 1;
         const requestBody = {
            firstName: 'New',
            lastName: 'User',
            email: 'new.user@example.com',
            phone: '9876543210',
         };

         const validatedUpdateData = { value: requestBody };
         const getProfileResponse = {
            status: true,
            message: 'User retrieved successfully',
            body: {
               id: userId,
               userName: 'old_username',
               password: 'old_password123',
               firstName: 'Old',
               lastName: 'User',
               email: 'old.user@example.com',
               phone: '1234567890',
               userRole: 'USER',
            },
         };
         const upsertedUser = { ...getProfileResponse.body, ...requestBody };

         validationServiceStub.validateUser.returns(validatedUpdateData);
         userRepositoryStub.upsert.resolves(upsertedUser);
         userRepositoryStub.findById.resolves(getProfileResponse.body);

         await UserService.updateProfile({ body: requestBody, params: { id: userId } }, res);

         sinon.assert.calledOnceWithExactly(validationServiceStub.validateUser, requestBody);
         sinon.assert.calledOnceWithExactly(
            userRepositoryStub.upsert,
            getProfileResponse.body,
            validatedUpdateData.value,
         );
         sinon.assert.calledOnceWithExactly(userRepositoryStub.findById, userId, true);
         sinon.assert.calledOnceWithExactly(
            responseServiceStub.json,
            ConfigService.constants.ResponseStatus.OK,
            res,
            'User profile update successful',
            upsertedUser,
         );
      });

      it('should handle validation error and return a bad request response', async () => {
         const userId = 1;
         const requestBody = {
            lastName: 'User',
            email: 'new.user@example.com',
            phone: '9876543210',
         };
         const validatedUpdateData = { error: { message: '' } };

         validationServiceStub.validateUser.returns(validatedUpdateData);

         await UserService.updateProfile({ body: requestBody, params: { id: userId } }, res);

         sinon.assert.calledOnceWithExactly(validationServiceStub.validateUser, requestBody);
         sinon.assert.notCalled(userRepositoryStub.upsert);
         sinon.assert.notCalled(userRepositoryStub.findById);
         sinon.assert.calledOnceWithExactly(
            responseServiceStub.json,
            ConfigService.constants.ResponseStatus.BAD_REQUEST,
            res,
            validatedUpdateData.error.message,
         );
      });

      it('should handle getProfile error and return an error response', async () => {
         const userId = 1;
         const requestBody = {
            userName: 'new_username',
            password: 'new_password123',
            firstName: 'New',
            lastName: 'User',
            email: 'new.user@example.com',
            phone: '9876543210',
            userRole: 'ADMIN',
         };

         const validationError = new Error('Validation error');

         validationServiceStub.validateUser.returns({ value: requestBody });
         userRepositoryStub.findById.rejects(validationError);

         await UserService.updateProfile({ body: requestBody, params: { id: userId } }, res);

         sinon.assert.calledOnceWithExactly(validationServiceStub.validateUser, requestBody);
         sinon.assert.notCalled(userRepositoryStub.upsert);
      });
   });
});
