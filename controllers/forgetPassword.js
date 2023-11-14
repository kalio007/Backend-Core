const jwt = require('jsonwebtoken')
const { User } = require("../models");
const { Token } = require("../models");
const sendEmail = require("../utils/sendEmail");
const jwtSecret = process.env.JWT_SECRET || jwt.secret
const crypto = require("crypto");


exports.forgetPasswood = async (req, res, next) => {
    const { email } = req.body;
    let existingUser = await User.findOne({ where: { email } })
    if (!existingUser) {
        return res.status(400).json({ message: "user not found" });
    }
    if (existingUser) {
        await Token.destory({
            where: { email },
        })
    }
    try {
        const expireDate = new Date(new Date().getTime() + (60 * 60 * 1000));
        const token = await Token.create({
            email,
            expiration: expireDate,
            token: crypto.randomBytes(32).toString("hex"),
        })
        //link to send to the user's email for reset
        const link = 'To reset your password, please click the link below.\n\nhttps://' + process.env.DOMAIN + '/user/reset_password?token=' + encodeURIComponent(token) + '&email=' + email;
        res.status(200).send({
            message: 'Password reset',
            link
        })
        await sendEmail(email, "password reset", link);
        return res.json(200).send('Password reset link sent to your email account');
    } catch (error) {
        return res.status(400).send({ message: error })
    }
}