const { EntitySchema } = require('typeorm');

const lessonSchema = new EntitySchema({
   name: 'Lesson',
   tableName: 'lessons',
   columns: {
      id: { primary: true, type: 'text', generated: 'uuid' },
      title: { type: 'varchar' },
      description: { type: 'varchar' },
      instructor: { type: 'text' },
      duration: { type: 'text' },
      phone: { type: 'text' },
      isActive: { type: 'bool', default: true },
      createdAt: { type: 'timestamp without time zone', default: new Date().toISOString() },
      updatedAt: { type: 'timestamp without time zone', default: new Date().toISOString() },
   },
});

module.exports = lessonSchema;
