const User = require("../models/User");
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')

const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const user = await User.create({ ...req.body }) //salting and hashing handled in mongo pre save middleware
    const token = user.creatJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}
const login = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        throw new BadRequestError("Please provide email and password")
    }
    
    const user = await User.findOne({ email });
    
    if (!user) {
        throw new UnauthenticatedError("Invalid credentials")
    }
    
    // const pass = await bcrypt.compare(password, user.password);     // moved to user model
    const pass = await user.comparePassword(password);
    if (!pass) {
        throw new UnauthenticatedError("Invalid credentials")
    }
    
    const token = user.creatJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = { register, login }


    // const { name, email, password } = req.body;

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt)

    // const tempUser = { name, email, password: hashedPassword } j