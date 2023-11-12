const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET || jwt.secret

exports.login = async (req, res, next) => {
    const { email, password, } = req.body
    // Check if username and password is provided
    if (!email || !password) {
        return res.status(400).json({
            message: "Username or Password not present",
        })
    }
    try {
        const user = await User.findOne({ where: { email: email } })
        if (!user) {
            res.status(400).json({
                message: "Login not successful",
                error: "User not found",
            })
        } else {
            // comparing given password with hashed password
            bcrypt.compare(password, user.password).then(function (result) {
                if (result) {
                    const maxAge = 3 * 60 * 60;
                    const token = jwt.sign(
                        { id: user.id, email: user.email },
                        jwtSecret,
                        { expiresIn: maxAge }
                    );
                    res.cookie("jwt", token, { httpOnly: true, expiresIn: maxAge * 1000 });
                    res.status(200).json({
                        message: "Login successful",
                        user,
                    })
                } else {
                    res.status(400).json({ message: "Login not succesful" })
                }
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        })
    }
}