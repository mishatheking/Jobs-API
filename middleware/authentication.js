const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors")

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new UnauthenticatedError("Authentication invalid")
    }
    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        // attaching the user to the job routes or next middleware; being our real request

        // const user = user.findById(payload.Id).select("-password")
        // req.user = user;

        req.user = { userId: payload.userId, name: payload.name }
        next()
    } catch (error) {
        throw new UnauthenticatedError("payload Authentication invalid")
    }
}
 
module.exports = auth