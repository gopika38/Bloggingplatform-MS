
const express = require('express');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const router = express.Router();

router.post('/', async (req, res) => {
    const { title, content, isPublic } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const post = new Post({ title, content, isPublic, author: decoded.id });
    await post.save();
    res.status(201).json(post);
});

router.get('/', async (req, res) => {
    const { page = 1, search = "" } = req.query;
    const posts = await Post.find({ isPublic: true, title: new RegExp(search, "i") })
        .skip((page - 1) * 10)
        .limit(10);
    res.json(posts);
});

router.put('/:id', async (req, res) => {
    const { title, content, isPublic } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const post = await Post.findOneAndUpdate({ _id: req.params.id, author: decoded.id }, { title, content, isPublic }, { new: true });
    if (!post) return res.status(404).json({ message: 'Post not found or unauthorized' });
    res.json(post);
});

router.delete('/:id', async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const post = await Post.findOneAndDelete({ _id: req.params.id, author: decoded.id });
    if (!post) return res.status(404).json({ message: 'Post not found or unauthorized' });
    res.json({ message: 'Post deleted successfully' });
});

module.exports = router;