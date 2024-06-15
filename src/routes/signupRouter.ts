import express, { Router ,Request,Response, NextFunction } from "express";
const router:Router = express.Router();
const jwt = require('jsonwebtoken');
const {signup} = require("../db");

router.post("/" , async (req:Request , res:Response, next:NextFunction)=>{
    try {
        const {username , password , tid , oid , aud , azp , name} = req.body;

        const existingUser = await signup.findOne({
            username: username
        });
        if(existingUser){
            return res.json({
                msg:"Email already taken"
            })
        }

        const newUser = await signup.create({username , password , tid , oid , aud , azp , name});
        const userId = newUser._id;

        const {password:removedPassword , ...tokenObj} = req.body;
        const token = jwt.sign(tokenObj , "yash123");
        
        return res.json({
            msg:"User signed up successfully",
            token
        })
    } catch (error) {
        next(error);
    }
})

module.exports = router;