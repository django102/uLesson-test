const RedisService = require('./RedisService');

const cachePrefixKey = 'uLesson:cache:';
const cacheIdentifiers = {
   userProfile: 'userProfile:',
   lesson: 'lesson:',
};

const CacheService = {
   getCacheKey: (identifier, keySuffix) => `${cachePrefixKey}${identifier}${keySuffix}`,

   storeUserProfile: async (userId, data) => {
      const cacheKey = this.getCacheKey(cacheIdentifiers.userProfile, userId);
      await RedisService.hSet(cacheKey, data);
   },

   getUserProfile: async (userId) => {
      const cacheKey = this.getCacheKey(cacheIdentifiers.userProfile, userId);
      return await RedisService.hGetAll(cacheKey);
   },

   storeLessons: async (lessonId) => {
      const cacheKey = this.getCacheKey(cacheIdentifiers.lesson, lessonId);
      return await RedisService.hSet(cacheKey);
   },

   getLessonsByInstructor: async (instructorId) => {
      const cacheKey = this.getCacheKey(cacheIdentifiers.lesson, `instructor:${instructorId}`);
      return await RedisService.hGetAll(cacheKey);
   },
};

module.exports = CacheService;
