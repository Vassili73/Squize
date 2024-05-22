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

    loadByUsername(benutzername, password) {
        var sql = 'SELECT * FROM User WHERE username=? AND password=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get([benutzername, password]);
     
        return result;
    }

    loadByEmail(email, password) {
        var sql = 'SELECT * FROM User WHERE email=? AND password=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get([email, password]);

        return result;
    }

    create(email, password) {
        var sql = 'INSERT INTO User (username,password,email) VALUES (?,?,?)';
        var statement = this._conn.prepare(sql);
        var result = statement.run([/* TODO implement usernames */'placeholder', password, email]);
        if (result.changes != 1) {
            return undefined;
        }

        return result;
    }
}

module.exports = UserDao;
