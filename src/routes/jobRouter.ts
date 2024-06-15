import { Router, Request, Response } from 'express';
const express = require('express');
const jwt = require("jsonwebtoken");
const router: Router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage : storage}); 

let jobIdCounter =1;

router.post('/' , upload.single('image') , async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.json({
            msg:"Wrong or no headers present"
        })
    }
    if(!req.file){
        return res.status(400).send("No file uploaded");
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token , "yash123");
        console.log(decoded);

        const fileBuffer = req.file.buffer;//filebuffer has an image
        const base64Image = fileBuffer.toString('base64');

        const jobData = {
            id: jobIdCounter++,
            token,
            image: base64Image,
            status: "Pending"
        };

        return res.json({
            msg:"File uploaded and converted to base64",
            jobData
        })

    } catch (error) {
        return res.status(403).json({
            Error:error
        })
    }
});

router.get("/" , (req:Request , res:Response)=>{
    res.json({
        msg:"API is working"
    })
})

router.get("/:id/status" , (req:Request , res:Response)=>{
    const jobId = parseInt(req.params.id);
    
})

module.exports = router;
