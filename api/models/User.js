const { EntitySchema } = require('typeorm');

const ConfigService = require('../services/ConfigService');
const { UserRole } = ConfigService.constants;

const userSchema = new EntitySchema({
   name: 'User',
   tableName: 'users',
   columns: {
      id: { primary: true, type: 'bigint', generated: true },
      userName: { type: 'varchar' },
      password: { type: 'varchar' },
      firstName: { type: 'text' },
      lastName: { type: 'text' },
      email: { type: 'email' },
      phone: { type: 'text' },
      isActive: { type: 'bool', default: true },
      userRole: { type: 'enum', enum: UserRole, default: UserRole.STUDENT },
      createdAt: { type: 'timestamp without time zone', default: new Date().toISOString() },
      updatedAt: { type: 'timestamp without time zone', default: new Date().toISOString() },
   },
});

module.exports = userSchema;
