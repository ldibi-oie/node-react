const Skills = require('../models/sequelize')
const ValidationError = require("sequelize");
const {Router} = require("express");

const router = new Router();

    router.get("/skills", async (req, res) => {
        try {
            const users = await Skills.findAll({ where: req.query });
            res.json(users);
        } catch (error) {
            res.sendStatus(500);
            console.error(error);
        }
    });

    router.post("/skills", async (req, res) => {
        try {
            const user = await Skills.create(req.body);
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

    router.put("/skills/:id", async (req, res) => {
        try {
            const result = await Skills.update(req.body, {
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

    router.delete("/skills/:id", async (req, res) => {
        try {
            const nbLine = await Skills.destroy({ where: { id: req.params.id } });
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

    router.get("/skills/:id", async (req, res) => {
        try {
            const user = await Skills.findByPk(req.params.id);
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