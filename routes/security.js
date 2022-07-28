const { Router } = require("express");
const { createToken } = require("../lib/jwt");
const { ValidationError } = require("sequelize");
const User = require("../models/sequelize/User");
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

router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body).then((response) => {
      res.send(response);
    });
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({
        quantity: "must be greather than 0",
        title: "must not be empty",
      });
    } else {
      res.sendStatus(500);
      console.error(error);
    }
  }
});

module.exports = router;
