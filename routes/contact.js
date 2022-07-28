const Contact = require("../models/contact");
const ContactService = require("../services/ContactService");
const { ValidationError } = require("sequelize");
const sequelize = require("../database/connnection");
const { Router } = require("express");

const router = new Router();

router.get("/", async (req, res) => {
  try {
    const contact = await contactService.getUserRoute();
    res.send(contact);
  } catch (err) {
    return next(err);
  }
});

router.get("/contact", async (req, res) => {
  try {
    const contact = await Contact.findAll({ where: req.query });
    res.json(contact);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.post("/contact", async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
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

router.put("/contact/:id", async (req, res) => {
  try {
    const result = await Contact.update(req.body, {
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

router.delete("/contact/:id", async (req, res) => {
  try {
    const nbLine = await Contact.destroy({ where: { id: req.params.id } });
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

router.get("/contact/:id", async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      res.sendStatus(404);
    } else {
      res.json(contact);
    }
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

module.exports = router;
