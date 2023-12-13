const { LessonRepository } = require('../repositories');
const ResponseService = require('./ResponseService');
const CacheService = require('./CacheService');
const ValidationService = require('./ValidationService');
const ConfigService = require('./ConfigService');
const { ResponseStatus } = ConfigService.constants;

const LessonService = {
   addLesson: async ({ body }, res) => {
      try {
         const { value: lesson, error } = ValidationService.validateLesson(body);
         if (error) {
            return ResponseService.json(ResponseStatus.BAD_REQUEST, res, error.message);
         }

         const createdLesson = await LessonRepository.upsert(lesson);
         await CacheService.storeLesson(createdLesson.id, createdLesson);

         return ResponseService.json(ResponseStatus.OK, res, 'Lesson added successfully', createdLesson);
      } catch (err) {
         ResponseService.handleError(res, err);
      }
   },

   getLessons: async ({ query }, res) => {
      try {
         const { title, instructor, perPage = 50, page = 1 } = query;
         const searchQuery = { where: { title, instructor }, take: perPage, skip: (page - 1) * perPage };

         const lessons = await LessonRepository.findByQuery(searchQuery);

         return ResponseService.json(ResponseStatus.OK, res, 'Lessons retrieved successfully', lessons);
      } catch (err) {
         ResponseService.handleError(res, err);
      }
   },
};

module.exports = LessonService;
