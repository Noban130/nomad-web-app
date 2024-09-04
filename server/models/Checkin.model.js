const mongoose = require('mongoose')

const CheckinSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    place: {
        type: Object,
        required: true,
    },
    assets: {
        type: Array,
        default: [],
    },
    rating: {
        type: Number,
    },
    recommend: {
        type: Boolean,
    },
    visible_for: {
        type: String,
    },
}, {
    timestamps: true
})

const Checkin = mongoose.model('Checkin', CheckinSchema)
module.exports = Checkin