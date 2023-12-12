const dotenv = require('dotenv');
dotenv.config();

const env = process.env;

const ConfigService = {
   settings: {
      NODE_ENV: env.NODE_ENV,
      PORT: env.PORT,

      APP_NAME: env.APP_NAME,
      APP_VERSION: env.APP_VERSION,

      DATABASE: {
         MYSQL: {
            HOST: env.DB_MYSQL_HOST,
            DATABASE: env.DB_MYSQL_DATABASE,
            PORT: env.DB_MYSQL_PORT,
            USER: env.DB_MYSQL_USER,
            PASSWORD: env.DB_MYSQL_PASSWORD,
         },
      },

      JWT_SECRET: env.JWT_SECRET,
   },

   constants: {},
};

module.exports = ConfigService;
