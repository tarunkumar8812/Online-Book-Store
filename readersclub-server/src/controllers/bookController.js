const bookModel = require('../models/bookModel')
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId.isValid

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

module.exports = { getAllBooks }