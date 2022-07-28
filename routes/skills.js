const Skill = require("../models//Skill");
const ValidationError = require("sequelize");
const { Router } = require("express");

const router = new Router();

router.get("/skill", async (req, res) => {
  try {
    const users = await Skill.findAll();
    res.json(users);
  } catch (error) {
    res.json(error);
    console.error(error);
  }
});

router.post("/skill", async (req, res) => {
  console.log(req.body);
  try {
    const user = await Skill.create(req.body);
    res.json(user);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.put("/skill/:id", async (req, res) => {
  try {
    const result = await Skill.update(req.body, {
      where: { id: req.params.id },
      returning: true,
      individualHooks: true,
    });
    const [, lines] = result;
    if (!lines[0]) {
      res.sendStatus(404);
    } else {
      res.json(lines[0]);
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error(error);
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

router.delete("/skill/:id", async (req, res) => {
  try {
    const nbLine = await Skill.destroy({ where: { id: req.params.id } });
    if (!nbLine) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.get("/skill/:id", async (req, res) => {
  try {
    const user = await Skill.findByPk(req.params.id);
    if (!user) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

module.exports = router;
