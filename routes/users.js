const express = require("express");
const router = express.Router();

function requireLogin(req, res, next) {
  if (!req.session.userAccount) {
    return res.redirect("/users/login");
  }
  next();
}

router.get("/login", (req, res) => {
  res.render("users/login", { error: null });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "user" && password === "user123") {
    req.session.userAccount = username;
    return res.redirect("/users/dashboard");
  }
  res.render("users/login", { error: "Invalid username or password" });
});

router.get("/dashboard", requireLogin, (req, res) => {
  res.render("users/dashboard", { title: "User Dashboard", user: req.session.userAccount });
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/users/login"));
});

module.exports = router;
