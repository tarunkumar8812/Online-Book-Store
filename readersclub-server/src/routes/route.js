const express = require('express');
const { books, createUser } = require('../controllers/bookController');
const router = express.Router()



router.get('/', (req, res) => {
    return res.status(200).json({ status: true, message: "Online Book Store Server is working..." })
})


router.get('/user/getAllBooks', books)

router.post('/user/createUser', createUser)

router.post('/user/login', (req,res) => {
    return res.status(200).json({ status: true, message: "login" })
})



router.get("/*", (req, res) => {
    return res.status(400).json({ message: "Page Not Found!!" })
})


module.exports = router