const fs = require('fs');
const path = require('path');

const fixtures = {};

function parseFixture(name) {
   if (!Object.prototype.hasOwnProperty.call(fixtures, name)) {
      throw new Error(`Fixture ${name} does not exist`);
   }

   return JSON.parse(fixtures[name]);
}

module.exports = {
   load: (directory) => {
      // eslint-disable-next-line no-console
      console.log('Loading fixtures...');

      try {
         const dirPath = path.resolve(__dirname, directory);

         const files = fs.readdirSync(dirPath).filter((fileName) => fileName.endsWith('.json'));

         files.forEach((file) => {
            const fileBase = file.slice(0, -5); // remove .json extension

            fixtures[fileBase] = fs.readFileSync(`${dirPath}/${file}`);
         });

         // eslint-disable-next-line no-console
         console.log('Fixtures loaded');
      } catch (err) {
         throw new Error(err);
      }
   },

   get: (name) => {
      try {
         // single response for string
         if (typeof name === 'string') {
            return parseFixture(name);
         }

         // assume we are getting multiple fixtures if 'name' is an array
         const response = {};
         name.forEach((key) => {
            response[key] = parseFixture(key);
         });

         return response;
      } catch (err) {
         throw new Error(err);
      }
   },

   list: () => {
      return Object.keys(fixtures);
   },
};
