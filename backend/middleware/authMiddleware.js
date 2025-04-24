const jwt = require("jsonwebtoken")
const { User } = require("../model/schema")
require("dotenv").config()
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization
    console.log(token);
    try {
        if (token) {
            const splittoken = token.split(" ")[1]
            const verify = await jwt.verify(splittoken, process.env.SECRET)
            if (verify) {
                const getUser = await User.findOne({ _id: verify.id })
                req.user = getUser
                
                next()
            } else {
                res.status(401).json({
                    message: "User not found or invalid token"
                })
            }
        } else {
            res.status(403).json({
                message: "No token provided"
            })
        }

    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

const checkRoleMiddleware = async (req,res,next) => {
    
    const user = req.user
    console.log(user);
    try {
        if(user.role == "admin") {
            next()
        } else {
            res.status(403).json({
                message:"User not permited"
            })
        }
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

module.exports = { authMiddleware, checkRoleMiddleware }