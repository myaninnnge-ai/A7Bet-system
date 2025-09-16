const express = require("express");
const router = express.Router();

// Auth middleware
function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/master/login");
  }
  next();
}

// GET Login page
router.get("/login", (req, res) => {
  res.render("master/login", { error: null });
});

// POST Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "a7bet" && password === "Lin110288") {
    req.session.user = username;
    return res.redirect("/master/dashboard");
  }
  res.render("master/login", { error: "Invalid username or password" });
});

// GET Dashboard (Protected)
router.get("/dashboard", requireLogin, (req, res) => {
  res.render("master/dashboard", { title: "Master Dashboard", user: req.session.user });
});

// GET Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/master/login"));
});

module.exports = router;
