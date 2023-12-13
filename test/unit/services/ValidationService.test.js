const { expect } = require('chai');
const { ValidationService } = require('../../../api/services');

describe('ValidationService', () => {
   describe('validateUser', () => {
      it('should validate a valid user', () => {
         const validUser = {
            userName: 'john_doe',
            password: 'password123',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phone: '12345678901',
            userRole: 'student',
         };
         const result = ValidationService.validateUser(validUser);
         expect(result.error).to.be.undefined;
      });

      it('should invalidate an invalid user', () => {
         const invalidUser = {
            userName: 'invalid-username',
            password: 'short',
            firstName: '123', // Invalid first name
            lastName: 'Doe',
            email: 'invalid-email', // Invalid email
            phone: 'invalid-phone',
            userRole: 'invalid-role',
         };
         const result = ValidationService.validateUser(invalidUser);
         expect(result.error).to.be.not.undefined;
         expect(result.error.details).to.have.lengthOf.at.least(1);
      });

      it('should invalidate missing required fields in user', () => {
         const incompleteUser = {
            userName: 'john_doe',
            password: 'password123',
            // Missing firstName, lastName, email, phone, userRole
         };
         const result = ValidationService.validateUser(incompleteUser);
         expect(result.error).to.be.not.undefined;
         expect(result.error.details).to.have.lengthOf.at.least(1);
      });
   });

   describe('validateLesson', () => {
      it('should validate a valid lesson', () => {
         const validLesson = {
            title: 'Introduction to Programming',
            instructor: 1,
         };
         const result = ValidationService.validateLesson(validLesson);
         expect(result.error).to.be.undefined;
      });

      it('should invalidate an invalid lesson', () => {
         const invalidLesson = {
            title: 'Invalid Title', // Invalid title
            instructor: 'invalid-instructor', // Invalid instructor
         };
         const result = ValidationService.validateLesson(invalidLesson);
         expect(result.error).to.be.not.undefined;
         expect(result.error.details).to.have.lengthOf.at.least(1);
      });

      it('should invalidate missing required fields in lesson', () => {
         const incompleteLesson = {
            // Missing title, instructor
         };
         const result = ValidationService.validateLesson(incompleteLesson);
         expect(result.error).to.be.not.undefined;
         expect(result.error.details).to.have.lengthOf.at.least(1);
      });
   });
});
