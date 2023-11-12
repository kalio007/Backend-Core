const jwt = require('jsonwebtoken')
const { User } = require("../models");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const jwtSecret = process.env.JWT_SECRET || jwt.secret

// const crypto = require("crypto");
// const bcrypt = require("bcrypt");


exports.resetPasswood = async (req, res, next) => {
    const { username } = req.body;
    let user = await User.findOne({ where: { username: username } })
    if (!user) {
        return res.status(400).json({ message: "user not found" });
    }
    let token = await Token.findOne({ where: { userId: user.id } })
    if (token) {
        await token.destory({ where: { token: token } })
    }
    let resetToken = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: "1h" })
    await new Token.Create({
        userId: user.id,
        token: resetToken
    })

    const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user.id}`;
    sendEmail(user.email, "Password Reset", { name: user.name, link: link, }, "./template/requestResetPassword.handlebars");
    return link;
}
