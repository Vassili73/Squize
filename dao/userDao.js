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
        var sql = 'SELECT * FROM User WHERE user_id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        // Never load password when loading by id
        delete result.password;

        return result;
    }

    loadByEmail(email) {
        var sql = 'SELECT * FROM User WHERE email=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get([email]);

        return result;
    }

    loadByUsername(username) {
        var sql = 'SELECT * FROM User WHERE username=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get([username]);

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

    create(username, email, password) {
        if (this.loadByEmail(email) !== undefined) {
            return undefined;
        }
        if (this.loadByUsername(username) !== undefined) {
            return undefined;
        }
        if (password.length < 8) {
            return {message : 'password must be at least 8 characters long'};
        }
        if (password.length > 64) {
            return {message : 'password cannot be over 64 characters long'};
        }

        let hash = bcrypt.hashSync(password, saltRounds);

        var sql = 'INSERT INTO User (username,password,email,country) VALUES (?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var result = statement.run([username, hash, email, 'DE']);
        if (result.changes != 1) {
            return undefined;
        }

        return result;
    }

    updateUsername(user_id, username) {
        var sql = 'UPDATE User SET username=? WHERE user_id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.run([username, user_id]);
        if (result.changes != 1) {
            return undefined;
        }

        return result;
    }

    updateEmail(user_id, email) {
        var sql = 'UPDATE User SET email=? WHERE user_id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.run([email, user_id]);
        if (result.changes != 1) {
            return undefined;
        }

        return result;   
    }

    updatePassword(user_id, password) {
        var sql = 'UPDATE User SET password=? WHERE user_id=?';
        var statement = this._conn.prepare(sql);

        let hash = bcrypt.hashSync(password, saltRounds);

        var result = statement.run([hash, user_id]);
        if (result.changes != 1) {
            return undefined;
        }

        return result;
    }
}

module.exports = UserDao;
