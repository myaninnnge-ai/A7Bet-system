const express = require("express");
const router = express.Router();

function requireLogin(req, res, next) {
  if (!req.session.admin) {
    return res.redirect("/admin/login");
  }
  next();
}

router.get("/login", (req, res) => {
  res.render("admin/login", { error: null });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin123") {
    req.session.admin = username;
    return res.redirect("/admin/dashboard");
  }
  res.render("admin/login", { error: "Invalid username or password" });
});

router.get("/dashboard", requireLogin, (req, res) => {
  res.render("admin/dashboard", { title: "Admin Dashboard", user: req.session.admin });
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/admin/login"));
});

module.exports = router;
