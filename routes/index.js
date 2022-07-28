const express = require('express');
const router = express.Router();

const usersRoute = require('./user');

module.exports = (params) => {
    router.get('/', (req, res) => {
        res.send('Home Page');
    });

    router.use('/user', usersRoute());

    return router;
};
