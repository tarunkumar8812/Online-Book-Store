const cartModel = require("../models/cartModel");
const userModel = require("../models/userModel")
const bcrypt = require("bcrypt");
const otpGen = require("otp-generator")
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
		let email_in_DB = await userModel.findOne({ email: email.toLowerCase() })
		if (email_in_DB) return res.status(409).send({ status: false, message: "Email is already registered" })


		// hasshing the password using Bcrypt
		hashPassword = await bcrypt.hash(password.trim(), 5)


		//  -------------- creating new user --------------
		const newUser = await userModel.create({ fullname: fullname.toLowerCase(), phone, email: email.toLowerCase(), password: hashPassword })

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
		let user = await userModel.findOne({ email });

		if (!user) return res.status(401).json({ status: false, message: "User not fonud!" })

		// password varification using Bcrypt
		bcrypt.compare(password, user.password, function (err, result) {
			if (!result) {
				return res
					.status(401)
					.send({ success: false, message: "Wrong password!" });
			} else {
				let token = jwt.sign(
					{
						userId: user._id.toString(),
						userName: user.fullname,
						exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // After 24 hour it will expire 
						iat: Math.floor(Date.now() / 1000)
					}, "this is a very secret key $#@54gs2dfGS^35t");

				res.setHeader("x-api-key", token);

				return res.status(200).json({ status: true, message: "Login successfully.", token, userName: user.fullname, email: user.email });
			}
		})




	}
	catch (err) {
		res.status(500).send({ status: false, message: err.message })
	}

}

//<-------------------------------------------- Reset Password API ------------------------------------------->
const generateOTP = async function (req, res) {
	try {
		// console.log(req.body);
		const { email, password } = req.body

		if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, message: "Email and Password required!!" })


		let OTP = otpGen.generate(6, { digits: true, upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false }).toString()

		// console.log("OTP generated - ", OTP)

		// ------------------ api call ------------------
		let user = await userModel.findOneAndUpdate({ email }, { otp: OTP }, { new: true });

		if (!user) return res.status(404).json({ status: false, message: "User not fonud!" })

		// console.log(user);

		hashPassword = await bcrypt.hash(password.trim(), 5)
		// console.log('hashPassword', hashPassword);

		return res.status(200).send({ status: true, message: user.otp, email: user.email, pass: hashPassword })
	}

	catch (err) {
		return res.status(500).send({ status: false, message: err.message })
	}
}
//<-------------------------------------------- Reset Password API ------------------------------------------->
const resetPassword = async function (req, res) {
	try {
		// console.log(req.body);
		const { email, typedOTP, pass } = req.body

		if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, message: "OTP is required!!" })

		// ------------------ api call ------------------
		let user = await userModel.findOne({ email });

		if (typedOTP !== user.otp) {
			return res.status(401).json({ status: false, message: "Wrong OTP!" })
		}
		let updatedPassword = await userModel.findOneAndUpdate({ email }, { password: pass, otp: false }, { new: true });

		// if (!updatedPassword) return res.status(400).json({ status: false, message: "Wrong OTP!" })

		// console.log(user);

		return res.status(200).send({ status: true, message: 'password reset successfully' })
	}

	catch (err) {
		return res.status(500).send({ status: false, message: err.message })
	}
}



module.exports = { createUser, userLogin, generateOTP, resetPassword }



