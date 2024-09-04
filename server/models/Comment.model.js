const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    },
    profile_img: {
        type: Object,
    },
    author_name: {
        type: String,
    },
    video: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    },
    content: {
        type: String,
        require: true,
    },
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment