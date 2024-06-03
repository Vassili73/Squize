const express = require('express');
const QuizDao = require('../dao/quizDao.js')
var serviceRouter = express.Router();

serviceRouter.post('/profile/create_quiz', function(request, response) {
    let quizDao = new QuizDao(request.app.locals.dbConnection);
    let res = quizDao.createQuiz(request.body);
    response.status(400).json(res)
});

serviceRouter.post('/profile/update_quiz', function(request, response) {
    let quizDao = new QuizDao(request.app.locals.dbConnection);
    let res = quizDao.updateQuiz(request.body);
    response.status(400).json(res)
});

module.exports = serviceRouter;
