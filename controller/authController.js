const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const Regester = async (req,res)=>{
    try {
        const {fullName, email, password, role} = req.body
        const userExact = await User.findOne({email})
        if(userExact){
            return res.status(400).json({message: "email already exists"})
        }
        const user = await User.create({fullName, email, password, role})
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})
        res.status(201).json({message: "user created successfully", token}) 
    } catch (error) {
        res.status(500).json({message: "Server is error"})
    }
}   

const login = async (req,res)=>{
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "user not found"})
        }
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})
        res.status(200).json({message: "login successfully", token})
    } catch (error) {
        res.status(500).json({message: "Server is error"})
        console.log(error);
    }
}   

module.exports = {Regester, login}