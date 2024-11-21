const db = require('../util/db');

module.exports = class User {
    constructor(name, last_name, username, password, title, email) {
        this.name = name;
        this.last_name = last_name;
        this.username = username;
        this.password = password;
        this.title = title;
        this.email = email;
    }

    static find(username) {
        return db.execute(
            'SELECT * FROM users WHERE username = ?', [username]
        );
    }

    static save(user){
        return db.execute(
            'INSERT INTO users (name, last_name, username, password, title, email) VALUES (?, ?, ?, ?, ?, ?)', [user.name, user.last_name, user.username, user.password, user.title, user.email]
        )
    }

    static fetchAll() {
        return db.execute(
            'SELECT * FROM users'
        );
    }
};

