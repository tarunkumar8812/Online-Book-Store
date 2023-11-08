const bookModel = require('../model/bookModel')
const userModel = require('../model/userModel')
const jwt = require('jsonwebtoken')

//<-------------------------------------------- Create User API ------------------------------------------->
const createUser = async function (req, res) {
    try {
        const body = req.body
        // const { title, name, phone, email, password, address, ...rest } = req.body
        const { fullname, phone, email, password } = req.body

        console.log(body);

        if (Object.keys(body).length == 0) return res.status(400).send({ status: false, message: "Please fill data in body" })

        
        //  ------- checking uniqueness of phone no. -------
        let phone_in_DB = await userModel.findOne({ phone: phone })
        if (phone_in_DB) return res.status(409).send({ status: false, message: "Phone Number is already registered" })



        //  ---------checking uniqueness of email ---------
        // let email_in_DB = await userModel.create//({ email: email })
        let email_in_DB = await userModel.findOne({ email: email })
        if (email_in_DB) return res.status(409).send({ status: false, message: "Email is already registered" })


        //  -------------- creating new user --------------
        const data = await userModel.create({ fullname, phone, email, password })

        return res.status(201).send({ status: true, message: "User successfully Registerd", data: data })
    }
    catch (err) {

        console.log(err.message);

        return res.status(500).send({ status: false, message: err.message })
    }
}




const books = async function (req, res) {
    try {
        console.log("req.body API Working", req.body);


        // if (Object.keys(queries).length == 0) {
        //     let bookList = await bookModel.find({ isDeleted: false }).select({ ISBN: 0, subcategory: 0, isDeleted: 0, deletedAt: 0, __v: 0, createdAt: 0, updatedAt: 0 }).collation({ locale: "en" }).sort({ title: 1 })

        //     if (bookList.length == 0) return res.status(404).send({ status: false, message: "No data found" })

        //     return res.status(200).send({ status: true, message: "list of Books", data: bookList })
        // }



        // const { userId, category, subcategory, ...rest } = req.query

        // if (Object.keys(rest).length > 0) return res.status(400).send({ status: false, message: `You can not get for these:-( ${Object.keys(rest)} ) data ` })

        // const filter = { isDeleted: false }

        // if (userId) {
        //     if (userId == undefined || userId.trim() == "") return res.status(400).send({ status: false, message: "please give value of filter" })

        //     if (!ObjectId(userId.trim())) return res.status(400).send({ status: false, message: "Invalid UserId" })

        //     filter.userId = userId.trim()
        // }

        // if (category) {
        //     if (category == undefined || category.trim() == "") return res.status(400).send({ status: false, message: "please give value of filter category" })

        //     filter.category = category.trim()
        // }

        // if (subcategory) {
        //     if (subcategory == undefined || subcategory.trim() == "") return res.status(400).send({ status: false, message: "please give value of filter Subcategory" })

        //     filter.subcategory = subcategory.trim()
        // }

        // let bookList = await bookModel.find(filter).select({ ISBN: 0, subcategory: 0, isDeleted: 0, deletedAt: 0, __v: 0 }).collation({ locale: "en" }).sort({ title: 1 })
        let bookCategory = await bookModel.aggregate([{ $group: { _id: "$category" } }, { "$sort": { "_id": -1 } }])

        let bookList = await bookModel.find()


        // let filters = {
        //     author: [],
        //     category: [],
        //     language: []

        // }
        // let ratings = 2
        // let minPrice = 300
        // let maxPrice = null


        // for (let filter in filters) {

        //     if (filters[filter].length <= 0) {

        //         delete filters[filter]
        //     }

        // }

        // let check = await bookModel.find({
        //     ...filters,
        //     ratings: { $gte: ratings || 1 },
        //     price: { $gte: minPrice || 1, $lte: maxPrice || 385 }
        // }).select({ ratings: 1, author: 1, category: 1, price: 1 })
        // console.log(check);


        if (bookList.length === 0) return res.status(404).send({ status: false, message: "No data found" })

        // console.log(bookList);
        return res.status(200).send({ status: true, message: "list of Books", bookCategory, bookList })
        // return res.status(200).send({ status: true, message: "list of Books", data: bookList })


    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }

}


module.exports = { books, createUser }
