const _ = require('lodash');
const Chance = require('chance');

const chance = new Chance();

const UtilityService = {
   generateRandomNumber: (minValue = 1000000000, maxValue = 9999999999, pad = '0000000000') => {
      const randomNumber = `${_.random(minValue, maxValue)}`;
      return pad.substring(0, pad.length - randomNumber.length) + randomNumber;
   },

   generateRandomString: (length = 36, casing = 'lower') => {
      return chance.string({ length, casing, alpha: true, numeric: true });
   },
   
   generateCode: (length = 12) => {
      return chance.string({ length, casing: 'lower', alpha: true, numeric: true });
   },
   
   generateOtp: (length = 6) => {
      return chance.string({ length, casing: 'lower', alpha: false, numeric: true });
   },
   
   slugify: (str) => {
      if (!str) return null;

      return (
         str
            .toString()
            .toLowerCase()
            .replace(/\s+/g, '-')
            // eslint-disable-next-line no-useless-escape
            .replace(/[^\w\-]+/g, '')
            // eslint-disable-next-line no-useless-escape
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '')
      );
   },
   
   isValidEmail: (email) => {
      const validEmail = new RegExp(
         // eslint-disable-next-line no-useless-escape
         /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
      return validEmail.test(email);
   },
   
   isAlphaNumeric: (value) => /^[a-z0-9]+$/i.test(value),
   isNumericString: (value) => /^\d+$/.test(value),
   isNumber: (value) => !isNaN(value),
   isInEnum: (Enum, value) => Enum.includes(value),
   isDateValid: (dateStr) => !isNaN(new Date(dateStr)),
   
   isValidUrl: (urlString) => {
      try {
         new URL(urlString);
      } catch (e) {
         return false;
      }

      return true;
   },
   
   isValidHttpsUrl: (urlString) => {
      let url;

      try {
         url = new URL(urlString);
      } catch (e) {
         return false;
      }

      return url.protocol === 'https:';
   },
   
   isValidDate: (dateString) => {
      // Define a regular expression for the expected date format (YYYY-MM-DD)
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;

      // Check if the input matches the expected format
      if (!datePattern.test(dateString)) {
         return false;
      }

      // Attempt to create a Date object from the input
      const date = new Date(dateString);

      // Check if the Date object is valid and the input date components match
      return (
         !isNaN(date.getTime()) &&
         date.getFullYear() === parseInt(dateString.substring(0, 4)) &&
         date.getMonth() === parseInt(dateString.substring(5, 7)) - 1 &&
         date.getDate() === parseInt(dateString.substring(8, 10))
      );
   },
   
   getCurrentDate: () => {
      const today = new Date();

      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
      const day = String(today.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
   },
   
   getUniqueKeysFromArray: (arr, field) => {
      const uniqueValues = new Set();

      for (const item of arr) {
         if (item[field]) {
            uniqueValues.add(item[field]);
         }
      }
      return Array.from(uniqueValues);
   },

   arrayContainsOnlyValidOptions: (arr, allowedSet) => {
      // Use the every method to check if all elements in the array are in the allowed set
      return arr.every((element) => allowedSet.includes(element));
   },
   
   arraysAreEqual: (arr1, arr2) => {
      if (arr1.length !== arr2.length) {
         return false; // Arrays have different lengths, they can't be the same
      }

      // Sort both arrays and convert their elements to lowercase for case-insensitive comparison
      const sortedArr1 = arr1
         .slice()
         .sort()
         .map((item) => item.toLowerCase());
      const sortedArr2 = arr2
         .slice()
         .sort()
         .map((item) => item.toLowerCase());

      // Compare the sorted arrays
      return sortedArr1.every((item, index) => item === sortedArr2[index]);
   },

   maskString: (str, start = 4, end = 4, mask = '*') => {
      if (!str) return null;

      const masked = str.substring(0, start) + mask.repeat(str.length - start - end) + str.substring(str.length - end);

      return masked;
   },

   formatAmount: (amount) => {
      amount = parseInt(amount / 100);
      const formattedAmount = new Intl.NumberFormat('en-NG', {
         style: 'currency',
         currency: 'NGN',
      }).format(amount);

      return formattedAmount;
   },
};

module.exports = UtilityService;
