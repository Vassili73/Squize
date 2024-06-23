class UserQuizDao {
    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    saveUserQuiz(userId, quizId) {
        var sql = 'INSERT INTO UserQuiz (user_id, quiz_id) VALUES (?, ?)';
        var statement = this._conn.prepare(sql);
        var result = statement.run([userId, quizId]);

        if (result.changes !== 1) {
            return { message: 'Failed to save user quiz' };
        }

        return { message: 'User quiz saved successfully' };
    }

    getSavedQuizzesByUserId(userId) {
        var sql = `
            SELECT Quizze.quiz_id, Quizze.quizname, Quizze.last_edited, Quizze.beschreibung, Quizze.is_public
            FROM UserQuiz
            JOIN Quizze ON UserQuiz.quiz_id = Quizze.quiz_id
            WHERE UserQuiz.user_id = ?
        `;
        var statement = this._conn.prepare(sql);
        var results = statement.all(userId);

        return results;
    }
}

module.exports = UserQuizDao;


