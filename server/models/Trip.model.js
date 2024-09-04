const mongoose = require("mongoose");

const TripSchema = mongoose.Schema(
    {
        departure: { type: String, required: true },
        destination: { type: String, required: true, trim: true },
        continent: { type: String, trim: true },
        tripType: { type: String, enum: ["one way", "road trip", "round trip"] },
        date: { type: Date, required: true },
        tripLength: { type: String, enum: ["weekend", "week", "month"] },
        timeOfYear: [
        {
            type: String,
            trim: true,
        },
        ],
        activityLevel: {
            type: String,
            enum: ["relaxed", "moderate", "active", "intense"],
            trim: true,
        },
        range: {
            type: String,
            enum: ["exact dates", "-+ day", "-+ 2day", "-+ 3day"],
        },
        budget: {
            min: { type: Number, min: 0 },
            max: { type: Number, min: 0 },
        },
        travelers: {
            adults: { type: Number, min: 0, default: 0 },
            kids: { type: Number, min: 0, default: 0 },
            pets: { type: Number, min: 0, default: 0 },
        },
        friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        cost: { type: Number, min: 0 },
    },
    {
        timestamps: true,
    }
);
module.exports = {  TripSchema };