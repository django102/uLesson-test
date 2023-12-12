/* eslint-disable no-undef */
/* eslint-disable no-console */
require('dotenv').config();

const { load: loadFixtures } = require('./util');

// const sinon = require('sinon');

loadFixtures('./unit/fixtures');

before(() => {
   const setup = new Promise((resolve) => {
      //   process.env.NODE_ENV = 'test';
      //   process.env.PORT = 81;
      //   process.env.DB_HOST = '127.0.0.1';
      //   process.env.DB_USER = 'test';
      //   process.env.DB_PASSWORD = 'test';
      //   process.env.DB_PORT = 3306;
      //   process.env.DB_DATABASE = 'holda';
      //   process.env.APP_NAME = 'holda';
      //   process.env.APP_VERSION = '1.0.0';
      //   process.env.JWT_SECRET = 'my_jwt_secret';

      console.log('Starting application...');

      resolve(true);
   });

   return Promise.resolve(setup);
});

after((done) => {
   console.log('Stopping application...');

   done();
});
