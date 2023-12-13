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

   constants: {
      ResponseStatus: {
         CONTINUE: 100,
         OK: 200,
         CREATED: 201,
         ACCEPTED: 202,
         MOVED_PERMANENTLY: 301,
         FOUND: 302,
         BAD_REQUEST: 400,
         UNAUTHORIZED: 401,
         FORBIDDEN: 403,
         NOT_FOUND: 404,
         METHOD_NOT_ALLOWED: 405,
         NOT_ACCEPTABLE: 406,
         INTERNAL_SERVER_ERROR: 500,
         NOT_IMPLEMENTED: 501,
         BAD_GATEWAY: 502,
         SERVICE_UNAVAILABLE: 503,
         GATEWAY_TIMEOUT: 504,
      },
      UserRole: {
         STUDENT: 'student',
         INSTRUCTOR: 'instructor',
      },
   },
};

module.exports = ConfigService;
