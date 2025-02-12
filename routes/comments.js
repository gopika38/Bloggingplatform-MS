const express = require('express');
const jwt = require('jsonwebtoken');
const Comment = require('../models/Comment');
const router = express.Router();

router.post('/', async (req, res) => {
    const { postId, content } = req.body;     
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const comment = new Comment({ postId, userId: decoded.id, content });
    await comment.save();
    res.status(201).json(comment);
});

module.exports = router;