const express = require("express");
const router = express.Router()
const { createUser, userLogin } = require('../controllers/userController')
const { getAllBooks, createBook } = require("../controllers/bookController.js");
const { addToCart, getCart, deleteCartItem, updateCartItem } = require("../controllers/cartController");
const { authentication } = require("../middleware/auth");


router.get('/', (req, res) => {
    return res.status(200).send({ status: true, message: "Online Book Store server created Successfully :-)" })
})



//<--------------------------- User API's ---------------------------->
router.post("/user/createUser", createUser)

router.post('/user/login', userLogin)



router.post('/user/createBook', createBook)

router.get('/user/getAllBooks', getAllBooks)



//<--------------------------- User-Cart API's ---------------------------->
router.post('/user/addToCart', authentication, addToCart)

router.post('/user/getCart', authentication, getCart)

router.post('/user/deleteCartItem', authentication, deleteCartItem)

router.post('/user/updateCartItem', authentication, updateCartItem)


module.exports = router