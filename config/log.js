var fs = require('fs')
var path = require('path')
var logDirectory = path.join(__dirname, '../storage/logs')
  , Log = require('log')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
log = new Log('debug', fs.createWriteStream(logDirectory+ '/express.log'))
var errlog = new Log('error', fs.createWriteStream(logDirectory+ '/error.log'));
  
// // var exports = module.exports = {};
// log = function(message){
//   debugLog.info(message);
// }

// ensure log directory exists