const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET || jwt.secret

exports.register = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body
    if (password.length < 6) {
        return res.status(400).json({ message: "Password less than 6 characters" })
    }
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
        return res.status(400).json({ message: "Email is already in use" });
    }
    //hashing the password for security purposes
    bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
            firstName,
            lastName,
            email,
            password: hash,
        })
            .then((user) => {
                const maxAge = 3 * 60 * 60;
                const token = jwt.sign(
                    { user_id: user.id, email: user.email },
                    jwtSecret,
                    { expiresIn: maxAge }
                );
                // res.cookie("jwt", token, { httpOnly: true, expiresIn: maxAge * 1000 });
                res.status(200).json({
                    message: "User successfully created",
                    user,
                    token: token,
                })
                // return user;
            })
            .catch((error) =>
                res.status(400).json({
                    message: "User not successful created",
                    error: error.message,
                })
            );
    });

}
