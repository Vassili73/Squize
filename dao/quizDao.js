

class QuizDao {
    constructor(dbConnection) {
        this._conn = dbConnection;
    }    

    getConnection() {
        return this._conn;
    }

    getQuizById(id) {
        var sql = 'SELECT * FROM Quizze WHERE quiz_id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get([id]);
        
        return result;
    }

    getQuizByUsername(username) {
        var user = "SELECT user_id FROM User WHERE username=?"
        var sql = 'SELECT * FROM Quizze WHERE user_id=?';
        var user_id = this._conn.prepare(user);
        var user_id_res = user_id.get(username);

        var statement = this._conn.prepare(sql);
        var result = statement.all(user_id_res);

        return result;
    }

    getQuizByName(quizname) {
        var sql = 'SELECT * FROM Quizze WHERE quizname=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(quizname);
        
        return result;
    }

    createQuiz(quizobject) {
        var maxql = 'SELECT MAX(quiz_id) FROM Quizze';
        var stmt = this._conn.prepare(maxql);
        var max_id = stmt.get();

        quiz = JSON.parse(quizobject);
        var sql = 'INSERT INTO Quizze (quiz_id, user_id, quizname, last_edited, beschreibung, is_public) VALUES (?, ?, ?, ?, ?, ?)';
        var statement = this._conn.prepare(sql);
        var info = statement.run([max_id + 1, 0, quiz.quizname.toString(), quiz.lastedit, quiz.beschreibung, quiz.is_public]);

        return info.changes;
    }

    // updateQuiz(quizobject) {
    //     var quiz = this.getQuizByName(quizobject)

    //     var sql = 'INSERT INTO Quizze (quiz_id, user_id, quizname, last_edited, beschreibung, is_public) VALUES (?, ?, ?, ?, ?, ?)';
    //     var statement = this._conn.prepare(sql);
    //     var info = statement.run([quiz.quiz_id, quiz.user_id, quiz.quizname.toString(), quiz.lastedit, quiz.beschreibung, quiz.is_public]);

    //     return info.changes;
    // }

    deleteQuiz(quizname = "", quiz_id = 0) {
        if (quizname = "" && quiz_id == 0) {
            return JSON.stringify({errormsg : "Du musst einen quizname oder eine quiz_id angeben"});
        }
        if(!(this.getQuizById(quiz_id) === undefined)) {
            var sql = 'DELETE FROM Quizze WHERE quiz_id=?';
            var statement = this._conn.prepare(sql);
            var info = statement.run(quiz_id);
            return info.changes;
        }
        if(!(this.getQuizByName(quizname) === undefined)) {
            var sql = 'DELETE FROM Quizze WHERE quizname=?'
            var statement = this._conn.prepare(sql);
            var info = statement.run(quizname);
            return info.changes;
        }
        return JSON.stringify({errormsg : "Quiz konnte nicht gefunden werden, versuche es mit einem anderen identifier"});
    }

}

module.exports = QuizDao;
