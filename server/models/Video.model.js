const mongoose = require('mongoose')

const VideoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    url: {
        type: Object,
    },
    assets: {
        type: Array,
        default: [],
    },
    location: {
        type: Object,
        default: {},
    },
    country: {
        type: String,
        default: '',
    },
    city: {
        type: String,
        default: '',
    },
    rating: {
        type: Number,
    },
    description: {
        type: String,
        default: '',
    },
    map: {
        type: String,
        default: '',
    },
    like: {
        type: Boolean,
    },
    place: {
        type: Object,
    },
    profile_img: {
        type: Object,
    },

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Comment',
        }
    ],
    saves: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    ],
}, {
    timestamps: true
})

const Video = mongoose.model('Video', VideoSchema)
module.exports = Video