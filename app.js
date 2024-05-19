const express = require('express')
const path = require('path')
const Database = require('better-sqlite3');

const app = express()
const port = 3000

const dbConnection = new Database(path.join(__dirname, 'db/squize.sqlite'), {});

// Static content
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }))

// Bootstrap dist
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist/')))

// Leaderboard
app.use('/api', require(path.join(__dirname, 'services/leaderboard.js')))

// Login
app.use('/api', require(path.join(__dirname, 'services/login.js')))

// Register
app.use('/api', require(path.join(__dirname, 'services/register.js')))

app.listen(port, () => {
  console.log(`Squize listening at http://localhost:${port}/`)
})
