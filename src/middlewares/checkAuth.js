const httpStatusCodes = require("../utils/httpStatusCodes");

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res
    .status(httpStatusCodes.UNAUTHORIZED)
    .json({ error: "You do not have access to this resource, please log in." });
}
module.exports = { ensureAuthenticated };
