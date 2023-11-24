const cartModel = require("../models/cartModel");
const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken')

//<-------------------------------------------- Create User API ------------------------------------------->
const createUser = async function (req, res) {
	try {
		const body = req.body

		// console.log(body);

		const { fullname, phone, email, password } = req.body

		if (Object.keys(body).length == 0) return res.status(400).send({ status: false, message: "Please fill data!!" })

		//  ------- checking uniqueness of phone no. -------
		let phone_in_DB = await userModel.findOne({ phone: phone })
		if (phone_in_DB) return res.status(409).send({ status: false, message: "Phone Number is already registered" })



		//  ---------checking uniqueness of email ---------
		// let email_in_DB = await userModel.create//({ email: email })
		let email_in_DB = await userModel.findOne({ email: email })
		if (email_in_DB) return res.status(409).send({ status: false, message: "Email is already registered" })


		//  -------------- creating new user --------------
		const newUser = await userModel.create({ fullname: fullname.toLowerCase(), phone, email, password })

		if (!newUser) {
			return res.status(400).send({ status: false, message: "User Registration failed!!" })
		}
		// console.log("newUser", newUser);
		// console.log("newUser", newUser._id);


		//  -------------- creating cart of new user --------------
		let newCart = await cartModel.create(
			{
				userId: newUser._id.toString(),
				items: [],
				totalPrice: 0,
				totalItems: 0
			})

		if (!newCart) {
			return res.status(400).send({ status: false, message: "cart is not created!!" })
		}
		// console.log("newCart", newCart);


		return res.status(201).send({ status: true, message: "Registered successfully" })
	}

	catch (err) {
		return res.status(500).send({ status: false, message: err.message })
	}
}


//<-------------------------------------------- User Login API ------------------------------------------->

const userLogin = async function (req, res) {
	try {
		const body = req.body

		if (Object.keys(body).length == 0) return res.status(400).send({ status: false, message: "Please fill data!!" })

		const { email, password, ...rest } = req.body

		// if (Object.keys(rest).length > 0) return res.status(400).send({ status: false, message: `You can not fill these:-( ${Object.keys(rest)} ) data` })


		// ------------------ api call ------------------
		let user = await userModel.findOne({ email, isDeleted: false });
		if (!user) return res.status(401).json({ status: false, message: "User not fonud!" })

		if (password != user.password) return res.status(401).json({ status: false, message: "Wrong password!" })


		let token = jwt.sign(
			{
				userId: user._id.toString(),
				userName: user.fullname,
				exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // After 24 hour it will expire 
				iat: Math.floor(Date.now() / 1000)
			}, "FunctionUp Group No 57");

		res.setHeader("x-api-key", token);

		// let data = {
		// 	token: token,
		// 	userId: user._id.toString(),
		// 	userName: user.fullname,
		// 	exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // After 24 hour it will expire 
		// 	iat: Math.floor(Date.now() / 1000)
		// }

		res.status(200).json({ status: true, message: "Login successfully.", token });
	}
	catch (err) {
		res.status(500).send({ status: false, message: err.message })
	}

}



module.exports = { createUser, userLogin }



