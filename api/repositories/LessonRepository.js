const { dataSource } = require('../db');
const { Lesson } = require('../models');

const LessonRepository = dataSource.getRepository(Lesson).extend({
   async upsert(lesson, updates) {
      if (lesson.id) {
         updates.updatedAt = new Date();
         await this.update({ id: lesson.id }, updates);

         return { ...lesson, ...updates };
      }

      return this.save({ ...lesson, createdAt: new Date() });
   },

   async findById(id) {
      return await this.findOne({ id });
   },

   async findByQuery(query) {
      return this.find(query);
   },
});

module.exports = LessonRepository;
