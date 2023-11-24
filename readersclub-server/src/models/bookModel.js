const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        requried: true,
        unique: true,
        trim: true,
    },
    author: {
        type: String,
    },
    price: {
        type: Number, requried: true
    },
    discountPercent: {
        type: Number,
        default: 0
    },
    soldCopies: {
        type: Number
    },
    excerpt: {
        type: String,
        requried: true,
        trim: true
    },
    description: {
        type: String,
        requried: true,
        trim: true
    },
    // authorId: {
    //     type: objectId,
    //     required: true
    // },
    // tags: {
    //     type: [String],
    // },
    isPublished: {
        type: Boolean
    },
    publishedYear: {
        type: Number
    },
    publisherId: {
        type: objectId,
        required: true
    },
    ISBN: {
        type: String,
        requried: true,
        unique: true
    },
    bookCover: {
        type: String,
        unique: true
    },
    thumbnail: {
        type: String,
        unique: true
    },
    images: {
        type: [String]
    },
    genre: {
        type: String
    },
    category: {
        type: String,
        requried: true,
        trim: true
    },
    subcategory: {
        type: String,
        required: true,
        trim: true
    },
    format: {
        type: String, enum: ["Hardcover", "Paperback", "Kindle eBook", "Bundle", "Board Book"],
    },
    numberOfPages: {
        type: Number,
    },
    ratings: {
        type: Number
    },
    reviews: {
        type: Number,
        default: 0,
    },
    weight: {
        type: Number
    },
    size: {
        type: String
    },
    language: {
        type: String
    },
    countryOfOrigin: {
        type: String
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    availableQuantity: {
        type: Number
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    },
    releasedAt: {
        type: Date,
        requried: true
    }

}, { timestamps: true })


module.exports = mongoose.model("Book", bookSchema)