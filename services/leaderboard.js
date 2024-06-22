const express = require('express');
const LeaderboardDao = require('../dao/leaderboardDao.js');
var serviceRouter = express.Router();

serviceRouter.get('/leaderboard', function(request, response) {
    let leaderboardDao = new LeaderboardDao(request.app.locals.dbConnection);
    let results = leaderboardDao.loadAll();
    if (!results) {
        response.status(400).json({ message: 'Failed to load leaderboard' });
        return;
    }

    response.status(200).json(results);
});

serviceRouter.get('/leaderboard/:country', function(request, response) {
    let leaderboardDao = new LeaderboardDao(request.app.locals.dbConnection);
    let results = leaderboardDao.loadByCountryCode(request.params.country);
    if (!results) {
        response.status(400).json({ message: 'Failed to load leaderboard' });
        return;
    }

    response.status(200).json(results);
});

serviceRouter.post('/leaderboard/update', function(request, response) {
    if (!request.session || !request.session.loggedIn) {
        response.status(400).json({ message: 'Not logged in' });
        return;
    }

    let leaderboardDao = new LeaderboardDao(request.app.locals.dbConnection);
    if (!leaderboardDao.createOrUpdate(request.session.user.id, request.body.points, request.body.percentage)) {
        response.status(400).json({ message: 'Failed to update leaderboard' });
        return;
    }

    response.status(200);
});

module.exports = serviceRouter;
