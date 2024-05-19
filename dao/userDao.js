class UserDao {
    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = 'SELECT * FROM User WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        return result;
    }
}

module.exports = BenutzerDao;
