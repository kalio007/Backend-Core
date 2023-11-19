const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const jwt = require('jsonwebtoken')
const { User } = require("../models/user")
const { Token } = require("../models");
const sendEmail = require("../utils/sendEmail");
const jwtSecret = process.env.JWT_SECRET || jwt.secret
const bcrypt = require("bcryptjs");


exports.getResetPasswood = async (req, res, next) => {
    const { email, token } = req.query
    await Token.destroy({
        where: {
            expiration: { [Op.lt]: Sequelize.fn('CURDATE') },
        }
    });
    const record = await Token.findOne({
        where: {
            email,
            expiration: { [Op.gt]: Sequelize.fn('CURDATE') },
            token,
        }
    })
    if (!record) {
        return res.status(200).send({
            message: 'Token not found',
            showForm: false
        });
    }
    res.status(200).send({
        message: "token exist",
        record,
        showForm: true
    })
}


exports.postResetPassword = async (req, res, next) => {
    const { email, password1, password2 } = req.body;
    if (password1 !== password2) {
        res.status(400).send({ message: "passwords do not match, please try again." })
    }
    if (password1.length < 6) {
        return res.status(400).send({ message: 'Password does not meet the minimum requirements' })
    }
    const token = await Token.findOne({
        where: {
            email
        }
    })
    if (!token) {
        return res.status(400).send({ message: 'Token is invalid or has expired. Please try the reset process again' })
    } else {
        try {
            const workFactor = 8;
            const newPassword = await bcrypt.hash(password1, workFactor);
            //to update the password on the database
            const updateUserPassword = await User.update({
                password: newPassword,
            },
                {
                    where: { email },
                })
            return res.status(200).send(
                {
                    updateUserPassword,
                    message: 'Password has been reset. Please continue with your new password.'
                }
            )
        } catch (error) {
            req.status(400).send({
                error: error.message
            })
        }
    }
}