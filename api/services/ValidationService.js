const Joi = require('joi');

const ConfigService = require('./ConfigService');
const { UserRole } = ConfigService.constants;

const userSchema = Joi.object({
   userName: Joi.string().regex(/^\w+$/).min(3).max(30).required(),
   password: Joi.string().alphanum().min(8).required(),
   firstName: Joi.string().alphanum().required(),
   lastName: Joi.string().alphanum().required(),
   email: Joi.string().email().required(),
   phone: Joi.string()
      .regex(/^\d{11}$/)
      .required(),
   userRole: Joi.string()
      .valid(...Object.values(UserRole))
      .required(),
});

const userUpdateSchema = Joi.object({
   firstName: Joi.string().alphanum().required(),
   lastName: Joi.string().alphanum().required(),
   email: Joi.string().email().required(),
   phone: Joi.string()
      .regex(/^\d{11}$/)
      .required(),
});

const lessonSchema = Joi.object({
   title: Joi.string().min(3).max(30).required(),
   instructor: Joi.number().required(),
});

const ValidationService = {
   validateUser: (user) => {
      return userSchema.validate(user, { abortEarly: false });
   },

   validateUserUpdate: (user) => {
      return userUpdateSchema.validate(user, { abortEarly: false });
   },

   validateLesson: (lesson) => {
      return lessonSchema.validate(lesson, { abortEarly: false });
   },
};

module.exports = ValidationService;
