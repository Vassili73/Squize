const express = require('express');
const UserDao = require('../dao/userDao.js')
var serviceRouter = express.Router();

serviceRouter.post('/user/login', function(request, response) {
    let userDao = new UserDao(request.app.locals.dbConnection);
    let user = userDao.checkPassword(request.body.email, request.body.password);
    if (user === undefined) {
        response.status(400).json({ errormsg: "Invalid credentials" });
    } else {
        response.status(200).json(user);
    }
});

serviceRouter.post('/user/register', function(request, response) {
    let userDao = new UserDao(request.app.locals.dbConnection);
    let user = userDao.create(request.body.username, request.body.email, request.body.password);
    if (user === undefined) {
        response.status(400).json({ status: "Failed to create user" });
    }
    if (user.hasOwnProperty("errormsg")){
        response.status(401).json(user);
    } else {
        response.status(200).json(user);
    }
});

module.exports = serviceRouter;
