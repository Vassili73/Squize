const express = require('express');
var serviceRouter = express.Router();

serviceRouter.get('/leaderboard/', function(request, response) {
    response.status(200).json([
        // TODO load from database
        {rang: 0, name: "Peter", punkte: 2000, prozent: 100},
        {rang: 1, name: "Peter2", punkte: 2000, prozent: 100},
        {rang: 2, name: "Peter3", punkte: 2000, prozent: 100},
    ]);
});

module.exports = serviceRouter;
