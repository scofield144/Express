const {logEvents} = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}\t${req.url}`, 'errorLog.txt'); // Log the error details
  console.error(err.stack);
  res.status(500).send(err.message); 
}

module.exports = errorHandler;