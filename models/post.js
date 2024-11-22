const db = require('../util/db');

module.exports = class Post {
    constructor(title, body, imageUrl) {
        this.title = title;
        this.body = body;
        this.imageUrl = imageUrl;
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
            'INSERT INTO posts (title, body, imageUrl) VALUES (?, ?, ?)', [post.title, post.body, post.imageUrl]
        );
    }
};