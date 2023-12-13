const redis = require('redis');
const ConfigService = require('./ConfigService');
const LoggerService = require('./LoggerService');
const { REDIS } = ConfigService.settings;
const { promisify } = require('util');

const connectionInfo = { host: REDIS.CLUSTER_IP };
if (REDIS.PORT) {
   connectionInfo.port = REDIS.PORT;
}
if (REDIS.PASSWORD) {
   connectionInfo.auth_pass = REDIS.PASSWORD;
}

const client = redis.createClient(connectionInfo);
client.on('error', (err) => {
   LoggerService.error(`Redis connection error. ${err}`);
});

// (async () => {
//     client.on('error', (err) => {
//         LoggerService.error(`Redis connection error. ${err}`);
//     });

//     client.on('ready', () => LoggerService.info('Redis is ready!'));

//     await client.connect();
//     await client.ping();
// })();

client.getAsync = promisify(client.get).bind(client);
client.setAsync = promisify(client.set).bind(client);
client.setExAsync = promisify(client.setEx).bind(client);
client.hGetAsync = promisify(client.hGet).bind(client);
client.hGetAllAsync = promisify(client.hGetAll).bind(client);
client.hSetAsync = promisify(client.hSet).bind(client);

const RedisService = {
   hSet: async (key, value) => {
      await client.hSetAsync(key, value);
      await client.disconnect();
   },

   hGetAll: async (key) => {
      return await client.hGetAllAsync(key);
   },

   hGet: async (key, field) => {
      return await client.hGetAsync(key, field);
   },

   // expire is in seconds.
   set: async (key, value, expire = null) => {
      if (expire) {
         return await client.setExAsync(key, expire, value);
      }

      return await client.setAsync(key, value);
   },

   get: async (key) => {
      return await client.getAsync(key);
   },
};

module.exports = RedisService;
