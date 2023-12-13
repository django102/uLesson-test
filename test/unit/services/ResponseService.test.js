const { expect } = require('chai');
const sinon = require('sinon');
const { ResponseService } = require('../../../api/services');

describe('ResponseService', () => {
   let res;
   let statusStub;
   let jsonStub;

   beforeEach(() => {
      res = {
         status: () => res,
         json: () => res,
         formatResponse: null, // Add a mock implementation if needed
      };

      statusStub = sinon.stub(res, 'status').returns(res);
      jsonStub = sinon.stub(res, 'json').returns(res);
   });

   afterEach(() => {
      sinon.restore();
   });

   describe('json', () => {
      it('should handle json response correctly when status > 201', () => {
         const status = 500;
         const message = 'Internal Server Error';
         const data = { key: 'value' };
         const meta = { metaKey: 'metaValue' };

         ResponseService.json(status, res, message, data, meta);

         expect(statusStub.calledOnceWithExactly(status)).to.be.true;
         expect(
            jsonStub.calledOnceWithExactly({
               status: false,
               message,
               data: data, // Assuming res.formatResponse is not defined in this example
               meta,
            }),
         ).to.be.true;
      });

      it('should handle json response correctly when status <= 201', () => {
         const status = 200;
         const message = 'OK';
         const data = { key: 'value' };

         ResponseService.json(status, res, message, data);

         expect(statusStub.calledOnceWithExactly(status)).to.be.true;
         expect(
            jsonStub.calledOnceWithExactly({
               status: true,
               message,
               data: data, // Assuming res.formatResponse is not defined in this example
            }),
         ).to.be.true;
      });
   });

   describe('nojson', () => {
      it('should handle nojson response correctly', () => {
         const status = 404;
         const message = 'Not Found';
         const data = { key: 'value' };

         ResponseService.nojson(status, res, message, data);

         expect(statusStub.calledOnceWithExactly(status)).to.be.true;
         expect(jsonStub.calledOnceWithExactly(data)).to.be.true;
      });
   });
});
