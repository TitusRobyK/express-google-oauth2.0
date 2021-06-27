const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/google",passport.authenticate("google", { scope: ["profile", "email", "openid"] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect(process.env.CLIENT_HOME_PAGE_URL);
    }
  )

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "User has been Successfully Authenticated",
      user: req.user,
      cookies: req.cookies,
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "User Authentication Failed.",
  });
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_HOME_PAGE_URL);
});

module.exports = router;