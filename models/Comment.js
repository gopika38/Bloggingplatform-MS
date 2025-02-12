const mongoose = require("mongoose");


const CommentSchema = new mongoose.Schema({
    postId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    content: String,
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Comment', CommentSchema);