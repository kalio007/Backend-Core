const jwt = require('jsonwebtoken')
const { User } = require("../models");
const { Token } = require("../models");
const sendEmail = require("../utils/sendEmail");
const jwtSecret = process.env.JWT_SECRET || jwt.secret

// const crypto = require("crypto");
// const bcrypt = require("bcrypt");


exports.resetPasswood = async (req, res, next) => {

}
