import express , { NextFunction, Request,Response, Router } from "express";
const router:Router = express.Router()
const jwt = require("jsonwebtoken")
const {signup} = require("../db");

router.post("/" ,async (req:Request , res:Response , next:NextFunction)=>{
    try {
        const {username,password} = req.body;

        const user = await signup.findOne({username});
        if(!user || user.password != password){
            return next(new Error("Wrong password or username"));
        }
        
        // const {password:removedPassword , _id , __v , ...rest} = user;
        const tokenObj = {
            username:user.username,
            tid:user.tid,
            oid:user.oid,
            aud:user.aud,
            azp:user.azp,
            name:user.name
        }
        console.log(tokenObj);
        let token = jwt.sign(tokenObj, "yash123", {expiresIn : "1h"});

        if(!token){
            return next(new Error("Token generation failed"));
        }

        res.status(200).json({msg:"Logged in successfully" , jwt:token});
    } catch (error) {
        next(error);
    }
})

module.exports = router;