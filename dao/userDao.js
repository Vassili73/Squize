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

    loadByUsername(benutzername, passwort) {
        var sql = 'SELECT * FROM User WHERE username=? AND password=?';
        var statement = this._conn.prepare(sql);
        var params = [benutzername, passwort];
        var result = statement.get(params);
     
        return result;
    }

    loadByEmail(email, passwort) {
        var sql = 'SELECT * FROM User WHERE email=? AND password=?';
        var statement = this._conn.prepare(sql);
        var params = [email, passwort];
        var result = statement.get(params);

        return result;
    }
}

module.exports = UserDao;
