'use strict';

require('dotenv').config();

process.on('unhandledRejection', (err) => {
   LoggerService.error(err);
});

// Make relative paths work from wherever
process.chdir(__dirname);

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const db = require('./api/db');

const app = express();
const port = process.env.PORT || 80;

const routes = require('./api/routes');

// eslint-disable-next-line no-unused-vars
const { LoggerService, ConfigService } = require('./api/services');

const rateLimit = require('express-rate-limit');
const rateLimiter = rateLimit({
   windowMs: 1 * 60 * 100,
   max: 10,
   message: 'Too many requests. Please try again after a minute',
});

app.use(express.static(path.join(__dirname, 'www')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '500mb' })); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json', limit: '500mb' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.use('/', rateLimiter, cors(), routes);

db.dataLoader();

app.listen(port, () => {
   LoggerService.info(
      `Starting application... ${ConfigService.settings.APP_NAME} v${ConfigService.settings.APP_VERSION} | ${ConfigService.settings.NODE_ENV} environment on port ${port}`,
   );
});
