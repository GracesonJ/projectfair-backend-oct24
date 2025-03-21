const users = require('../models/userModel')
const jwt = require('jsonwebtoken')

// Register
exports.register = async (req, res) => {
    console.log(`Inside Register Controller`);
    // logic
    const { username, email, password } = req.body
    console.log(username, email, password);

    try {
        // find existing users
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json(`User already Exists...!`)
        } else {
            const newUser = new users({
                username,
                email,
                password,
                profile: "",
                github: "",
                linkedin: ""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(401).json(error)
    }




}

// user login

exports.login = async (req, res) => {
    console.log(`inside Login Controller`);

    const { email, password } = req.body
    console.log(email, password);
    try {
        const existingUser = await users.findOne({ email, password })
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, "secretKey")
            res.status(200).json({ existingUser, token })
        } else {
            res.status(406).json(`Incorrect email or Password`)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// update user profile
exports.updateUserProfileController = async (req, res) => {
    console.log(`Inside update user profile controller`);
    const userId = req.payload
    const { username, email, password, profile, github, linkedin } = req.body
    uploadImg = req.file ? req.file.filename : profile

    try {
        const existingUser = await users.findByIdAndUpdate({ _id: userId }, {
            username,
            email,
            password,
            profile: uploadImg,
            github,
            linkedin
        }, { new: true })
        await existingUser.save()
        res.status(200).json(existingUser)
    } catch (error) {
        res.status(401).json(error)
    }
}


