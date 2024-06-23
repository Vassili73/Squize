const express = require('express');
const QuizDao = require('../dao/quizDao.js')
var serviceRouter = express.Router();

serviceRouter.get('/quiz/popular', function(request, response) {
    let quizDao = new QuizDao(request.app.locals.dbConnection);

    let amount = 3;
    if (request.query.amount) {
        amount = request.query.amount;
    }

    let results = quizDao.getPopularQuizzes(amount);
    if (!results) {
        response.status(400).json({ message: 'Failed to load quizzes' });
        return;
    }

    response.status(200).json(results);
});

serviceRouter.get('/quiz/:id', function(request, response) {
    let quizDao = new QuizDao(request.app.locals.dbConnection);
    let result = quizDao.getQuizById(request.params.id);
    if (!result) {
        response.status(400).json({ message: 'Failed to load quiz' });
        return;
    }

    response.status(200).json(result);
});

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
