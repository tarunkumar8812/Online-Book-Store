const express = require('express');
const route = require('./routes/route.js')
const moment = require("moment")
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
require("dotenv").config()

app.use(express.json());

mongoose.connect(process.env.MONGO_URL || "mongodb+srv://TarunKumar123:xLcX9W1SI9646ftM@cluster1.tpwtwiv.mongodb.net/Project_3", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use(
    function (req, res, next) {
        let time = moment().format("DD/MM/YYYY hh:mm:ss a")
        console.log(`time : ${time} , url : ${req.url} `);
        next();
    }
);
app.use(cors())

app.use('/', route);

app.listen((process.env.PORT || 5000), function () {
    console.log('Express app running on port ' + (process.env.PORT || 5000))
});

