const cartModel = require("../models/cartModel");




//<-------------------------------------------- Create User API ------------------------------------------->
const addToCart = async function (req, res) {
    try {

        const { bookId, price, weight, discount } = req.body
        const userId = req.userId
        // console.log('req.userId', req.userId);


        //------------ checking cart is present for the given userID ------------ 
        let cartInDB = await cartModel.findOne({ userId });

        if (!cartInDB) {
            return res.status(404).send({ status: false, message: "Cart not found" });
        }

        const matchFound = cartInDB.items.filter((item) => item.bookId.toString() === bookId)

        if (matchFound.length > 0) {
            return res.status(409).send({ status: false, message: "This Book is already added in your Cart" });
        }


        //---------- if a new book is going to be add in cart which is not present yet ---------

        let newBookAddedInCart = await cartModel
            .findOneAndUpdate(
                { userId },
                {
                    $push: {
                        items: { bookId, quantity: 1, weight, price, discount: discount || 0 }
                    },
                    totalPrice: price,
                    totalItems: 1
                },
                { new: true, upsert: true })

        if (!newBookAddedInCart) {
            return res.status(400).send({ status: false, message: "Failed to add Book in cart!!" });
        }

        return res.status(201).send({ status: true, message: "Book is added to cart Successfully" });


    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}





// ------------------------------------ get Cart API -------------------------------------

const getCart = async (req, res) => {
    try {
        const userId = req.userId
        // console.log('userId', userId);


        let cartInDB = await cartModel.findOne({ userId }).populate(
            {
                path: 'items',
                populate: {
                    path: 'bookId'
                }
            }
        )//.select({ __v: 0 });

        if (!cartInDB) return res.status(404).send({ status: false, message: "Cart not found!!" });

        // let allBooks = await bookModel.find()//.populate()//.select({ __v: 0 });

        return res.status(200).send({ status: true, message: "Success", cartInDB });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

// -------------------------------------- delete Cart API --------------------------------

async function deleteCartItem(req, res) {
    try {
        const userId = req.userId
        const bookIdToDelete = req.body.toDelete

        let updatedCart = await cartModel
            .findOneAndUpdate(
                { userId },
                { $pull: { items: { bookId: bookIdToDelete } } },
                { new: true, upsert: true }
            )

        // console.log('updatedCart', updatedCart);

        if (!updatedCart) return res.status(400).send({ status: false, message: "Failed to remove book form Cart!!" });

        return res.status(200).send({ status: true, message: "Book is removed from Cart successfully" });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}
// -------------------------------------- updateCartItem Cart API --------------------------------

async function updateCartItem(req, res) {
    try {
        const userId = req.userId
        const { bookIdToUpdate, newQuantity } = req.body
        // console.log('bookIdToUpdate', bookIdToUpdate);
        // console.log(bookIdToUpdate, newQuantity);


        let updateCart = await cartModel.findOneAndUpdate(
            { userId },
            { $set: { 'items.$[x].quantity': newQuantity } },
            {
                arrayFilters: [
                    { "x.bookId": bookIdToUpdate }
                ]
            }
        )

        if (!updateCart) return res.status(400).send({ status: false, message: "Failed to update quantity in cart" });
        // console.log(updateCart);  

        return res.status(200).send({ status: true, message: "Quantity is updated in Cart successfully" });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

module.exports = { addToCart, getCart, deleteCartItem, updateCartItem };