const moment = require("moment");

module.exports = function (req, res, next) {
  console.log("RECENT REQUEST");
  console.log("METHOD: " + req.method);
  console.log("URL: " + req.url);
  console.log("Timestamp_Formatted: " + moment().fromNow(Date.now()) + " ago");
  console.log("Timestamp: " + Date.now());
  next();
};
