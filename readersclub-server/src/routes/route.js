const express = require('express');
const router = express.Router()


router.get("/", (req, res) => {
    return res.status(200).json({ message: "frist route" })
})

router.get("/hello", (req, res) => {
    return res.status(200).json({ message: "hello route" })
})
module.exports = router