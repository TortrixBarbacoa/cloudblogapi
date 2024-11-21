const db = require('../util/db');

module.exports = class Post {
    constructor(title, body, user) {
        this.title = title;
        this.body = body;
    }

    static fetchAll() {
        return db.execute(
            'SELECT * FROM posts'
        );
    }

    static fetchPost(id) {
        return db.execute(
            'SELECT * FROM posts WHERE id = ?', [id]
        );
    }

    static deletePost(id) {
        return db.execute(
            'DELETE FROM posts WHERE id = ?', [id]
        );
    }

    static save(post) {
        return db.execute(
            'INSERT INTO posts (title, body) VALUES (?, ?)', [post.title, post.body]
        );
    }
};
