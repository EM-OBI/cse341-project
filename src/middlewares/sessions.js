const session = require("express-session");

const sessionMiddleware = session({
  secret: "secret",
  resave: false,
  saveUninitialized: true
});

module.exports = sessionMiddleware;
