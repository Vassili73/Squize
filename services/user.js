const express = require('express');
const UserDao = require('../dao/userDao.js')
var serviceRouter = express.Router();

serviceRouter.get('/user', function(request, response) {
    if (!request.session || !request.session.loggedIn) {
        response.status(400).json({ message: 'Not logged in' });
        return;
    }

    response.status(200).json(request.session.user);
});

serviceRouter.post('/user/login', function(request, response) {
    let userDao = new UserDao(request.app.locals.dbConnection);
    let user = userDao.checkPassword(request.body.email, request.body.password);
    if (user === undefined) {
        response.status(400).json({ message: 'Invalid credentials' });
        return;
    }

    if (request.body.maxAge) {
        request.session.cookie.maxAge = request.body.maxAge;
    }

    request.session.loggedIn = true;
    request.session.user = {
        user_id: user.user_id,
        username: user.username,
        email: user.email
    };

    response.status(200).json({});
});

serviceRouter.post('/user/logout', function(request, response) {
    if (!request.session || !request.session.loggedIn) {
        response.status(400).json({ message: 'Not logged in' });
        return;
    }

    request.session.destroy(err => {
        if (err) {
            response.status(400).json({ message: 'Failed to log out' });
        } else {
            response.status(200).json({});
        }
    });
});

serviceRouter.post('/user/register', function(request, response) {
    let userDao = new UserDao(request.app.locals.dbConnection);
    let user = userDao.create(request.body.username, request.body.email, request.body.password);
    if (user === undefined) {
        response.status(400).json({ status: 'Failed to create user' });
    }
    if (user.hasOwnProperty("message")){
        response.status(401).json(user);
    } else {
        response.status(200).json(user);
    }
});

serviceRouter.post('/user/update/username', function(request, response) {
    if (!request.session || !request.session.loggedIn) {
        response.status(400).json({ message: 'Not logged in' });
        return;
    }

    let userDao = new UserDao(request.app.locals.dbConnection);
    let result = userDao.updateUsername(request.session.user.user_id, request.body.username);
    if (result === undefined) {
        response.status(400).json({ status: 'Failed to update user' });
        return;
    }

    request.session.user.username = request.body.username;
    response.status(200).json({});
});

serviceRouter.post('/user/update/password', function(request, response) {
    if (!request.session || !request.session.loggedIn) {
        response.status(400).json({ message: 'Not logged in' });
        return;
    }

    let userDao = new UserDao(request.app.locals.dbConnection);
    let user = userDao.checkPassword(request.session.user.email, request.body.oldpassword);
    if (user === undefined) {
        response.status(400).json({ message: 'Invalid old password' });
        return;
    }

    let result = userDao.updatePassword(request.session.user.user_id, request.body.newpassword);
    if (result === undefined) {
        response.status(400).json({ status: 'Failed to update user' });
        return;
    }

    response.status(200).json({});
});

serviceRouter.post('/user/update/email', function(request, response) {
    if (!request.session || !request.session.loggedIn) {
        response.status(400).json({ message: 'Not logged in' });
        return;
    }

    let userDao = new UserDao(request.app.locals.dbConnection);
    let result = userDao.updateEmail(request.session.user.user_id, request.body.email);
    if (result === undefined) {
        response.status(400).json({ status: 'Failed to update user' });
        return;
    }

    request.session.user.email = request.body.email;
    response.status(200).json({});
});

module.exports = serviceRouter;
