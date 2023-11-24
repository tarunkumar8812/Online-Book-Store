const express = require("express");
const moment = require("moment");
const cors = require('cors')
const router = require("./routers/router.js");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())



mongoose.connect(process.env.MONGO_URL || "mongodb+srv://TarunKumar123:xLcX9W1SI9646ftM@cluster1.tpwtwiv.mongodb.net/Project_3", {
    useNewUrlParser: true
}
)
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log(err.message));




app.use(
    (req, res, next) => {
        let time = moment().format("DD/MM/YYYY hh:mm:ss a")
        console.log(`time : ${time} , url : ${req.url} `);
        next();
    }
);

// routes
app.use("/", router)



app.use("/*", (req, res) => {
    return res.status(404).send({ status: false, message: `Invalid Path url` })
});


app.listen(process.env.PORT || 5000, function () {
    console.log("Express app running on port " + (process.env.PORT || 5000))
})