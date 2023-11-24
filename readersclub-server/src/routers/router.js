const express = require("express");
const router = express.Router()
const { getAllBooks } = require('../controllers/bookController');
const { createNote, getNotes, deleteNote, updateNote } = require('../controllers/userController.js')


router.get('/', (req, res) => {
    return res.status(200).send({ status: true, message: "Online Book Store server created Successfully :-)" })
})

router.get('/user/getAllBooks', getAllBooks)

// router.post('/user/createNote', createNote)

// router.get('/user/getNotes', getNotes)

// router.delete('/user/deleteNote', deleteNote)

// router.put('/user/updateNote', updateNote)



module.exports = router