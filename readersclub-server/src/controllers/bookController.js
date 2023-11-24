const bookModel = require('../models/bookModel')
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId.isValid
const { validBookTitle, validBookExcerpt, validUserId, validISBN, validCategory, validSubcategory, validReview, validReleasdAt, validIsDeleted } = require("../validation/validBook.js")



const createBook = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "please enter require data to create Book" })

        let { title, excerpt, ISBN, category, subcategory, reviews, author, price, discountPercent, soldCopies, description, authorId, isPublished, publishedYear, publisherId, bookCover, thumbnail, images, genre, format, numberOfPages, ratings, weight, size, language, countryOfOrigin, isAvailable, availableQuantity, ...rest } = data;

        if (Object.keys(rest).length > 0) return res.status(400).send({ status: false, message: `You can not fill these:-( ${Object.keys(rest)} ) data ` })


        if (validBookTitle(title) != true) return res.status(400).send({ status: false, message: `${validBookTitle(title)}` })

        if (validBookExcerpt(excerpt) != true) return res.status(400).send({ status: false, message: `${validBookExcerpt(excerpt)}` })

        // if (validUserId(userId) != true) return res.status(400).send({ status: false, message: `${validUserId(userId)}` })

        if (validISBN(ISBN) != true) return res.status(400).send({ status: false, message: `${validISBN(ISBN)}` })

        if (validCategory(category) != true) return res.status(400).send({ status: false, message: `${validCategory(category)}` })

        if (validSubcategory(subcategory) != true) return res.status(400).send({ status: false, message: `${validSubcategory(subcategory)}` })

        // if (validReview(reviews) != true) return res.status(400).send({ status: false, message: `${validReview(reviews)}` })

        // if (validReleasdAt(releasedAt) != true) return res.status(400).send({ status: false, message: `${validReleasdAt(releasedAt)}` })

        // if (validIsDeleted(isDeleted) != true) return res.status(400).send({ status: false, message: `${validIsDeleted(isDeleted)}` })


        //  ------- checking uniqueness of title -------
        let title_in_DB = await bookModel.findOne({ title: title })
        if (title_in_DB) return res.status(400).send({ status: false, message: "This title is already taken" })

        //  ------- checking uniqueness of ISBN -------
        let ISBN_in_DB = await bookModel.findOne({ ISBN: ISBN })
        if (ISBN_in_DB) return res.status(400).send({ status: false, message: "ISBN Already Exists" })

        //  ------- checking existance of user -------
        // let user_in_DB = await userModel.findById({ _id: userId })
        // if (!user_in_DB) return res.status(404).send({ status: false, message: "No such user exist" })

        //  ------------ creating new book ------------
        let savedData = await bookModel.create(data)
        return res.status(201).send({ status: true, message: "Book successfully created", data: savedData })

    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

//  <--------------------------------------------------- Get Books API --------------------------------------------------->

const getAllBooks = async function (req, res) {
    try {
        console.log("req.body", req.body);

        let bookCategory = await bookModel.aggregate([{ $group: { _id: "$category" } }, { "$sort": { "_id": -1 } }])

        let bookList = await bookModel.find()

        if (bookList.length == 0) return res.status(404).send({ status: false, message: "No data found" })

        console.log(bookList);
        return res.status(200).send({ status: true, message: "list of Books", bookCategory, bookList })
        // return res.status(200).send({ status: true, message: "list of Books", data: bookList })


    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }

}

module.exports = { createBook, getAllBooks }