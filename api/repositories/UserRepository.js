const { dataSource } = require('../db');
const User = require('../models/User');

const UserRepository = dataSource.getRepository(User).extend({
   async upsert(user, updates) {
      if (user.id) {
         updates.updatedAt = new Date();
         await this.update({ id: user.id }, updates);

         return { ...user, ...updates };
      }

      const savedUser = this.save({ ...user, createdAt: new Date() });
      this.removeSensitiveData(savedUser);
      return savedUser;
   },

   async findById(id, removeSensitiveData = false) {
      const user = await this.findOne({ id });

      if (removeSensitiveData) {
         this.removeSensitiveData(user);
      }

      return user;
   },

   async findByUsernameOrEmail(value, removeSensitiveData = false) {
      const users = await this.find({
         where: [{ userName: value }, { email: value }],
      });

      if (removeSensitiveData) {
         users.forEach(this.removeSensitiveData);
      }
      return users;
   },

   async findByQuery(query, removeSensitiveData = false) {
      const users = await this.find(query);

      if (removeSensitiveData) {
         users.forEach(this.removeSensitiveData);
      }

      return users;
   },

   removeSensitiveData(user) {
      if (user) {
         delete user.password;
      }
   },
});

module.exports = UserRepository;
