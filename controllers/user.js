const { User } = require("../models");
const bcrypt = require("bcryptjs");

exports.register = (req, res, next) => {
    const { username, password, role } = req.body
    if (password.length < 6) {
        return res.status(400).json({ message: "Password less than 6 characters" })
    }
    bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
            username: username,
            password: hash,
            role: role,
        })
            .then((user) =>
                res.status(200).json({
                    message: "User successfully created",
                    user,
                })
            )
            .catch((error) =>
                res.status(400).json({
                    message: "User not successful created",
                    error: error.message,
                })
            );
    });

}
