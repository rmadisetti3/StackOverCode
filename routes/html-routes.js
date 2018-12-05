const path = require("path");

module.exports = function(app) {
  // HTML GET Requests
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
