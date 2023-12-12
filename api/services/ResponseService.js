module.exports = {
    json(status, res, message, data, meta) {
       if (status > 201) {
          // add some logging here
       }
 
       const response = {
          status: true,
          message,
       };
 
       if (status > 299) {
          response.status = false;
       }
 
       if (typeof data !== 'undefined') {
          response.data = res.formatResponse ? res.formatResponse(data) : data;
       }
 
       if (typeof meta !== 'undefined') {
          response.meta = meta;
       }
 
       // log response here
 
       return res.status(status).json(response);
    },
 
    nojson(status, res, message, data) {
       const response = data;
 
       // log response here
 
       return res.status(status).json(response);
    },
 };
 