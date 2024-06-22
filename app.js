const express = require('express');
const session = require('express-session');
const path = require('path');
const Database = require('better-sqlite3');
var cors = require('cors')

const app = express();
const port = 3000;

const dbConnection = new Database(path.join(__dirname, 'db/squize.sqlite'), { verbose: console.log });
app.locals.dbConnection = dbConnection;

app.use(express.json())

app.use(cors())

// Set up session
app.use(session({
    secret: 'securesecretforsquize',
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: 'strict'
    }
}));

// Static content
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));

// Bootstrap dist
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist/')));

// JQuery dist
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist/')));

// Leaderboard
app.use('/api', require(path.join(__dirname, 'services/leaderboard.js')));

// User
app.use('/api', require(path.join(__dirname, 'services/user.js')));

// Quiz
app.use('/api', require(path.join(__dirname, 'services/quiz.js')));

app.listen(port, () => {
    console.log(`Squize listening at http://localhost:${port}/`);
});
