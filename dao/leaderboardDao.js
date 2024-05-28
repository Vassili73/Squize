const UserDao = require('./userDao.js')

class LeaderboardDao {
    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = 'SELECT * FROM Leaderboard WHERE leaderboard_id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (!result) {
            return undefined;
        }

        let userDao = new UserDao(this.getConnection());
        result.user = userDao.loadById(result.user_id);
        delete result.user_id;

        return result;
    }

    loadByUserId(userId) {
        var sql = 'SELECT Leaderboard.* FROM Leaderboard, User WHERE Leaderboard.user_id = User.user_id AND User.user_id = ?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(userId);

        if (!result) {
            return undefined;
        }

        let userDao = new UserDao(this.getConnection());
        result.user = userDao.loadById(result.user_id);
        delete result.user_id;

        return result;
    }

    loadAll() {
        let userDao = new UserDao(this.getConnection());
        var sql = 'SELECT * FROM Leaderboard ORDER BY score * percentage DESC';
        var statement = this._conn.prepare(sql);
        var results = statement.all();

        if (!results) {
            return [];
        }

        for (let r of results) {
            r.user = userDao.loadById(r.user_id);
            delete r.user_id;
        }

        return results;
    }

    loadByCountryCode(countryCode) {
        let userDao = new UserDao(this.getConnection());
        var sql = 'SELECT Leaderboard.* FROM Leaderboard, User WHERE Leaderboard.user_id = User.user_id AND User.country = ? ORDER BY Leaderboard.score * Leaderboard.percentage DESC';
        var statement = this._conn.prepare(sql);
        var results = statement.all(countryCode);

        if (!results) {
            return [];
        }

        for (let r of results) {
            r.user = userDao.loadById(r.user_id);
            delete r.user_id;
        }

        return results;
    }

    create(user_id, points, percentage) {
        var sql = 'INSERT INTO Leaderboard (user_id,points,percentage) VALUES (?,?,?)';
        var statement = this._conn.prepare(sql);
        var result = statement.run([user_id, points, percentage]);
        if (result.changes != 1) {
            return undefined;
        }

        return result;
    }

    update(leaderboard_id, user_id, points, percentage) {
        var sql = 'UPDATE Leaderboard SET user_id=?,points=?,percentage=? WHERE leaderboard_id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.run([user_id, points, percentage, leaderboard_id]);
        if (result.changes != 1) {
            return undefined;
        }

        return result;
    }

    createOrUpdate(user_id, points, percentage) {
        let existing = this.loadByUserId(user_id);
        if (existing) {
            return this.update(existing.leaderboard_id, user_id, points, percentage);
        }

        return this.create(user_id, points, percentage);
    }
}

module.exports = LeaderboardDao;
