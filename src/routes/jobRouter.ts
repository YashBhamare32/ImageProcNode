import { Router, Request, Response } from 'express';
import FormData from "form-data"
const axios = require("axios");
const express = require('express');
const jwt = require("jsonwebtoken");
const {blob}  = require("../db")
const router: Router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage : storage}); 

let jobIdCounter = 1;

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

        const fileBuffer = req.file.buffer;//filebuffer has the image

        const formData = new FormData();
        formData.append('image', fileBuffer, {
            filename: 'image.jpg',
            contentType: 'image/jpeg'
        });
        formData.append('token', token);

        try {
            const response = await axios.post("http://localhost:3000/api/v1/blob", formData, {
                headers: {
                    ...formData.getHeaders(),
                    Authorization: authHeader // Preserve original authorization header
                }
            });

            console.log(response);

            if (response.status !== 200) {
                return res.status(response.status).json({ msg: 'Blob API returned an error', error: response.data });
            }

            return res.json({
                msg:"File uploaded and converted to base64",
                jobData : response.data.newBlob
            })

        } catch (error) {
            return res.json({
                msg:"Error from blob api",
                error
            })
        } 

    } catch (error) {
        return res.status(403).json({
            msg:"Error handled in job api",
            Error:error
        })
    }
});

router.get("/" , (req:Request , res:Response)=>{
    res.json({
        msg:"API is working"
    })
})

interface Blob {
    id: number;
    token: string;
    base64Image: string;
    status: string;
  }

router.get("/status/:id" , async (req:Request , res:Response)=>{
    const jobId = parseInt(req.params.id);
    const existingJob = await blob.findOne({id : jobId});
    if(!existingJob){
        console.log("No job found");
        return res.json({
            msg:"Job does not exist"
        })
    }

    const status = existingJob.status;
    return res.json({
        jobId,
        status
    });
});

module.exports = router;
