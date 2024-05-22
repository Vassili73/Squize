const bcrypt = require('bcrypt');
const saltRounds = 10;

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

    loadByEmail(email) {
        var sql = 'SELECT * FROM User WHERE email=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get([email]);

        return result;
    }

    checkPassword(email, password) {
        let user = this.loadByEmail(email);
        if (user === undefined) {
            return undefined;
        }

        if (bcrypt.compareSync(password, user.password) === false) {
            return undefined;
        }

        return user;
    }

    create(email, password) {
        if (this.loadByEmail(email) !== undefined) {
            return undefined;
        }

        let hash = bcrypt.hashSync(password, saltRounds);

        var sql = 'INSERT INTO User (username,password,email) VALUES (?,?,?)';
        var statement = this._conn.prepare(sql);
        var result = statement.run([/* TODO implement usernames */'placeholder', hash, email]);
        if (result.changes != 1) {
            return undefined;
        }

        return result;
    }
}

module.exports = UserDao;
