const express = require('express');
const { body } = require('express-validator');
const postsController = require('../controllers/postsController');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', postsController.fetchAll);

router.get('/:id', postsController.fetchPost);

router.post(
  '/', [
    body('title').trim().not().isEmpty(),
    body('body').trim().not().isEmpty()
  ],
  postsController.postPost
);


module.exports = router;