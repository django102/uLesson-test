const { expect } = require('chai');
const { UtilityService } = require('../../../api/services');

describe('UtilityService', () => {
   describe('generateRandomNumber', () => {
      it('should generate a random number within the specified range and padding', () => {
         const result = UtilityService.generateRandomNumber(100, 999, '000');
         expect(result).to.be.a('string');
         expect(result).to.match(/^\d{3}$/);
      });
   });

   describe('generateRandomString', () => {
      it('should generate a random string with the specified length and casing', () => {
         const result = UtilityService.generateRandomString(8, 'lower');
         expect(result).to.be.a('string');
         expect(result).to.have.lengthOf(8);
      });
   });

   describe('generateCode', () => {
      it('should generate a random code with the specified length', () => {
         const result = UtilityService.generateCode(12);
         expect(result).to.be.a('string');
         expect(result).to.have.lengthOf(12);
      });
   });

   describe('generateOtp', () => {
      it('should generate a random OTP with the specified length', () => {
         const result = UtilityService.generateOtp(6);
         expect(result).to.be.a('string');
         expect(result).to.match(/^\d{6}$/);
      });
   });

   describe('slugify', () => {
      it('should slugify a string', () => {
         const result = UtilityService.slugify('Hello World');
         expect(result).to.equal('hello-world');
      });
   });

   describe('isValidEmail', () => {
      it('should validate a valid email', () => {
         const result = UtilityService.isValidEmail('test@example.com');
         expect(result).to.be.true;
      });

      it('should invalidate an invalid email', () => {
         const result = UtilityService.isValidEmail('invalid-email');
         expect(result).to.be.false;
      });
   });

   describe('isAlphaNumeric', () => {
      it('should validate an alphanumeric string', () => {
         const result = UtilityService.isAlphaNumeric('abc123');
         expect(result).to.be.true;
      });

      it('should invalidate a non-alphanumeric string', () => {
         const result = UtilityService.isAlphaNumeric('abc@123');
         expect(result).to.be.false;
      });
   });

   describe('isNumericString', () => {
      it('should validate a numeric string', () => {
         const result = UtilityService.isNumericString('12345');
         expect(result).to.be.true;
      });

      it('should invalidate a non-numeric string', () => {
         const result = UtilityService.isNumericString('abc123');
         expect(result).to.be.false;
      });
   });

   describe('isNumber', () => {
      it('should validate a number', () => {
         const result = UtilityService.isNumber(42);
         expect(result).to.be.true;
      });

      it('should invalidate a non-number', () => {
         const result = UtilityService.isNumber('not-a-number');
         expect(result).to.be.false;
      });
   });

   describe('isInEnum', () => {
      it('should validate a value in the enum', () => {
         const result = UtilityService.isInEnum(['A', 'B', 'C'], 'B');
         expect(result).to.be.true;
      });

      it('should invalidate a value not in the enum', () => {
         const result = UtilityService.isInEnum(['A', 'B', 'C'], 'D');
         expect(result).to.be.false;
      });
   });

   describe('isDateValid', () => {
      it('should validate a valid date string', () => {
         const result = UtilityService.isDateValid('2023-12-01');
         expect(result).to.be.true;
      });

      it('should invalidate an invalid date string', () => {
         const result = UtilityService.isDateValid('invalid-date');
         expect(result).to.be.false;
      });
   });

   describe('isValidUrl', () => {
      it('should validate a valid URL', () => {
         const result = UtilityService.isValidUrl('https://example.com');
         expect(result).to.be.true;
      });

      it('should invalidate an invalid URL', () => {
         const result = UtilityService.isValidUrl('invalid-url');
         expect(result).to.be.false;
      });
   });

   describe('isValidHttpsUrl', () => {
      it('should validate a valid HTTPS URL', () => {
         const result = UtilityService.isValidHttpsUrl('https://example.com');
         expect(result).to.be.true;
      });

      it('should invalidate an invalid or non-HTTPS URL', () => {
         const result = UtilityService.isValidHttpsUrl('http://example.com');
         expect(result).to.be.false;
      });
   });

   describe('isValidDate', () => {
      it('should validate a valid date string', () => {
         const result = UtilityService.isValidDate('2023-12-01');
         expect(result).to.be.true;
      });

      it('should invalidate an invalid date string', () => {
         const result = UtilityService.isValidDate('invalid-date');
         expect(result).to.be.false;
      });
   });

   describe('getCurrentDate', () => {
      it('should return the current date in YYYY-MM-DD format', () => {
         const currentDate = UtilityService.getCurrentDate();
         const today = new Date();
         const expectedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today
            .getDate()
            .toString()
            .padStart(2, '0')}`;
         expect(currentDate).to.equal(expectedDate);
      });
   });

   describe('getUniqueKeysFromArray', () => {
      it('should return unique keys from an array of objects', () => {
         const arr = [
            { id: 1, name: 'John' },
            { id: 2, name: 'Jane' },
            { id: 1, name: 'Jim' },
         ];

         const result = UtilityService.getUniqueKeysFromArray(arr, 'id');
         expect(result).to.deep.equal([1, 2]);
      });
   });

   describe('arrayContainsOnlyValidOptions', () => {
      it('should check if an array contains only valid options', () => {
         const arr = ['option1', 'option2', 'option3'];
         const allowedSet = ['option1', 'option2', 'option3'];

         const result = UtilityService.arrayContainsOnlyValidOptions(arr, allowedSet);
         expect(result).to.be.true;
      });

      it('should check if an array contains invalid options', () => {
         const arr = ['option1', 'invalidOption', 'option3'];
         const allowedSet = ['option1', 'option2', 'option3'];

         const result = UtilityService.arrayContainsOnlyValidOptions(arr, allowedSet);
         expect(result).to.be.false;
      });
   });

   describe('arraysAreEqual', () => {
      it('should check if two arrays are equal', () => {
         const arr1 = ['apple', 'banana', 'orange'];
         const arr2 = ['banana', 'apple', 'orange'];

         const result = UtilityService.arraysAreEqual(arr1, arr2);
         expect(result).to.be.true;
      });

      it('should check if two arrays are not equal', () => {
         const arr1 = ['apple', 'banana', 'orange'];
         const arr2 = ['apple', 'orange'];

         const result = UtilityService.arraysAreEqual(arr1, arr2);
         expect(result).to.be.false;
      });
   });

   describe('maskString', () => {
      it('should mask characters in a string', () => {
         const result = UtilityService.maskString('confidential-data', 5, 5, '*');
         expect(result).to.equal('confi*******-data');
      });

      it('should return null for empty input', () => {
         const result = UtilityService.maskString(null, 5, 5, '*');
         expect(result).to.be.null;
      });
   });

   describe('formatAmount', () => {
      it('should format the amount into currency format', () => {
         const amount = 50000;
         const result = UtilityService.formatAmount(amount);
         expect(result).to.be.a('string');
         expect(result).to.match(/^₦\d{1,3}(,\d{3})*(\.\d{2})?$/);
      });
   });
});
