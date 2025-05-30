const passport = require("passport");
const router = require("express").Router();

router.get(
  "/login",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/api-docs" }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
