const z = require("zod")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { User } = require("../model/schema")
const validationSchema = z.object({
    userName: z.string(),
    email: z.string().email(),
    password: z.string().min(5, { message: "Password must be atleast 5 character long" }),
    number: z.string().regex(/^\d+$/, { message: "Number must contain only digits" }).length(10, { message: "Number must be exactly 10 digits long" }),
    role: z.string().min(4, { message: "Role must be atleast 4 character long" })
})
const loginValidationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5, { message: "Password must be atleast 5 character long" })
})
const register = async (req, res) => {
    let { userName, password, number, role, email } = req.body
    userName = userName.trim().toLowerCase()
    password = password.trim()
    role = role.trim()
    const validation = validationSchema.safeParse({ userName: userName, password: password, number: number, role: role, email: email })
    try {
        if (validation.success) {
            if(role == "admin" || role == "staff"){
                const findByNumber = await User.findOne({ number: number })
                const findByEmail = await User.findOne({ email: email })
                if (!findByNumber && !findByEmail) {
                    const findRole = await User.findOne({ role: role })
                    if (findRole?.role != "admin") {
                        const encryptedPassword = await bcrypt.hash(password, 10)
                        const createUser = await new User({
                            userName: userName,
                            email: email,
                            password: encryptedPassword,
                            number: number,
                            role: role
                        })
                        const save = await createUser.save()
                        if (save) {
                            res.status(200).json({
                                message: "User created successfully"
                            })
                        }
                    } else {
                        res.status(409).json({
                            message: "Admin already exist"
                        })
                    }
                } else {
                    res.status(409).json({
                        message: "The number or email name already exist"
                    })
                }
            } else {
                res.status(409).json({
                    message:`Role with name ${role} doesnot exist`
                })
            }
        } else {
            res.status(409).json({
                message: validation.error.errors
            })
        }
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}


const login = async (req, res) => {
    let { email, password } = req.body
    const validation = loginValidationSchema.safeParse({ email: email, password: password })
    try{
        if(validation.success) {
            const findUser = await User.findOne({email:email})
            if(findUser) {
                const comparePassword = await bcrypt.compare(password, findUser.password)
                if(comparePassword) {
                    const token = await jwt.sign({id:findUser._id},process.env.SECRET)
                    res.status(200).json({
                        message:"Login successfull",
                        token : token
                    })
                } else {
                    res.status(401).json({
                        message:"Invalid password"
                    })
                }
            }else{
                res.status(401).json({
                    message:"Email not found"
                })
            }
        } else {
            res.status(409).json({
                message:"Invalid input"
            })
        }
    } catch (e) {
        res.status(500).json({
            message:e.message
        })
    }
}
const getUser = async(req,res) =>{
    try {
        const getUsers = await User.find({role:"staff"})
        if(getUser.length > 0) {
            res.status(200).json({
                message:"Data fetched successfully",
                data:getUsers
            })
        } else {
            res.status(404).json({
                message:"No data found"
            })
        }
    } catch(e) {
        res.status(500).json({
            message:e.message
        })
    }
}
module.exports = { register, login, getUser }