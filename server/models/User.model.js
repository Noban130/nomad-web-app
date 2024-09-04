const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"],
        min: [8, 'The password sould be at least 8 characters!'],
        trim: true,
    },
    firstname: {
        type: String,
        trim: true,
        default: '',
    },
    lastname: {
        type: String,
        trim: true,
        default: '',
    },
    username: {
        type: String,
        trim: true,
        unique: true,
    },
    birthday: {
        type: Date,
    },
    country: {
        type: String,
    },
    location: {
        type: String,
    },
    profile_img: {
        type: Object,
        default: {}
    },
    step_completed: {
        type: Number,
        default: 0
    },

    visited_countries: {
        type: Array,
        default: [],
    },
    bucket_list: {
        type: Array,
        default: [],
    },

    balance: {
        type: Number,
        default: 0,
    },
    wallet_address: {
        type: String,
    },

    inbox: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
        },
    ],
    connections: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
        },
    ],
    connections_requests: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
        },
    ],
    sent_connections_requests: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
        },
    ],
    
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Video',
        }
    ],
    checkins: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Checkin',
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Checkin',
        }
    ],

    
    liked_videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video',
            required: true,
        }
    ],
    saved_videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video',
            required: true,
        }
    ],
}, {
    timestamps: true
})

const User = mongoose.model('User', UserSchema)
module.exports = User