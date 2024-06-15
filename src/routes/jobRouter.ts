import { Router, Request, Response } from 'express';
const express = require('express');
const jwt = require("jsonwebtoken");
const router: Router = express.Router();

const multer = require("multer");
const upload = multer({dest : "storage/"}); 

router.post('/' , upload.single('image') , async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.json({
            msg:"Wrong or no headers present"
        })
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token , "yash123");
        console.log(decoded);

        const {image} : any = req.file;
        console.log(image);
        if(!image){
            return res.json({
                msg:"No image or wrong image"
            })
        }
        const base64Image = image.buffer.toString('base64');
        
        return res.json({
            base64:base64Image
        })

    } catch (error) {
        return res.status(403).json({
            Error:error
        })
    }
});

module.exports = router;
