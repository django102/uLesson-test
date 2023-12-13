const { DataSource } = require('typeorm');
const ConfigService = require('./services/ConfigService');
const models = require('./models');

const { settings } = ConfigService;
const { DATABASE } = settings;
const { MYSQL } = DATABASE;

const dataSource = new DataSource({
   type: 'mysql',
   host: MYSQL.HOST,
   port: MYSQL.PORT,
   username: MYSQL.USER,
   password: MYSQL.PASSWORD,
   database: MYSQL.DATABASE,
   multipleStatements: true,
   supportBigNumbers: true,
   bigNumberStrings: true,
   dateStrings: true,
   entities: [models],
});

const dataLoader = async () => {
   await dataSource
      .initialize()
      .then(async (connection) => {
         if (connection.isInitialized) {
            // eslint-disable-next-line no-console
            console.log('connected to database!');
         } else {
            // eslint-disable-next-line no-console
            console.warn('Could not initialize database!');
         }
      })
      .catch((err) => {
         // eslint-disable-next-line no-console
         console.log(`Error connecting to database. ${err}`);
      });
};

const getDataSource = async () => {
   if (!dataSource.isInitialized) {
      await dataLoader();
   }

   return dataSource;
};

module.exports = {
   dataSource,
   dataLoader,
   getDataSource,
};
