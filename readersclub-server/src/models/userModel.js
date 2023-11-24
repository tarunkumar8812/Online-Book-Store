const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    // title: {
    //     type: String,
    //     enum: ["Mr", "Mrs", "Miss"],
    //     trim: true
    // },
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        street: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            trim: true
        },
        pincode: {
            type: String,
            trim: true
        }
    }, otp: {
        type: String,
        default: false
    }
}, { timestamps: true })
module.exports = mongoose.model('User', userSchema)
