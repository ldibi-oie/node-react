const { Router } = require("express");
const { createToken, verifyToken } = require("../lib/jwt");
const { ValidationError } = require("sequelize");
const User = require("../models//User");
const bcryptjs = require("bcryptjs");

const router = new Router();

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(401).json({
        message: "Email not found",
      });
    }

    if (!bcryptjs.compareSync(req.body.password, user.password)) {
      // authentication failed
      return res.status(401).json({
        message: "Password is incorrect",
      });
    }

    res.json({
      token: createToken(user),
    });
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.get("/logout", async (req, res) => {
  try {
    var p = localStorage;
    p.clear();
    res.json({
      status: true,
    });
  } catch (error) {
    res.json({
      status: false,
      errors: error.message,
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    localStorage.removeItem("token");
    res.status(201).json({ status: true });
  } catch (error) {
    res.json({ status: false, error: error.message });
  }
});

module.exports = router;
