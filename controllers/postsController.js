const { validationResult } = require('express-validator');

const Post = require('../models/post');

exports.fetchAll = async (req, res, next) => {
    try {
        const [allPosts] = await Post.fetchAll();
        res.status(200).json(allPosts);
    } catch (err) {
        console.error('Error creating post:', err);
        next(err);
    }
};

exports.postPost = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed',
            errors: errors.array()
        });
    }

    const { title, body } = req.body;

    try {
        const postDetails = {
            title: title,
            body: body
        };
        result = await Post.save(postDetails); 
        res.status(201).json({ message: 'Post created successfully!' });
    } catch (err) {
        console.error('Error creating post:', err);
        next(err);
    }
};

exports.fetchPost = async (req, res, next) => {
    const postId = req.params.id;

    try {
        const [post] = await Post.fetchPost(postId);
        res.status(200).json(post);
    } catch (err) {
        console.error('Error fetching post:', err);
        next(err);
    }
};
