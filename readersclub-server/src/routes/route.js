const express = require('express');
const { books } = require('../controllers/bookController');
const router = express.Router()




router.get('/getAllBooks', books)


router.get("/*", (req, res) => {
    return res.status(400).json({ message: "Page Not Found!!" })
})


module.exports = router