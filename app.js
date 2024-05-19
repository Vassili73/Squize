const express = require('express')
const path = require('path')

const app = express()
const port = 3000

// Static content
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }))

// Bootstrap dist
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist/')))

// Leaderboard
app.use('/api', require(path.join(__dirname, 'services/leaderboard.js')))

app.listen(port, () => {
  console.log(`Squize listening at http://localhost:${port}/`)
})
