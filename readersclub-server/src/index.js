const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
require("dotenv").config()

app.use(express.json());

mongoose.connect(process.env.MONGO_URL || "mongodb+srv://TarunKumar123:xLcX9W1SI9646ftM@cluster1.tpwtwiv.mongodb.net/ReadersClub", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))


app.use(cors())

// app.use('/', route);
app.use('/', function () {
    console.log('hi Sir')
    return 'hi'
});
app.use('/hello', function () {
    console.log('hello Sir')
    return 'hello'
});
app.listen((process.env.PORT || 3000), function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});



// app.use("/*", function (req, res) {
//     return res.status(400).send({ status: false, message: "invalid request params (path not found)" })
// });