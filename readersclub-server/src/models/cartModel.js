const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        // bookId: {
        //     type: ObjectId,
        //     ref: "User",
        //     required: true,
        //     unique: true
        // },
        // weight: {
        //     type: Number,
        // },
        // price: {
        //     type: Number,

        // },
        // discount: {
        //     type: Number,

        // },
        items: [
            {
                bookId: {
                    type: ObjectId,
                    ref: "Book",
                    required: true,
                    trim: true,
                },
                quantity: {
                    type: Number,
                    required: true
                }, //min 1
                price: {
                    type: Number,
                    required: true
                }, //min 1
                discount: {
                    type: Number,
                    default: 0
                }, //min 1
                weight: {
                    type: Number,
                }, //min 1
            },
        ],
        totalPrice: {
            type: Number,
            required: true
        }, //comment: "Holds total price of all the items in the cart"
        totalItems: {
            type: Number,
            required: true
        } //comment: "Holds total number of items in the cart"
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('Cart', cartSchema)
