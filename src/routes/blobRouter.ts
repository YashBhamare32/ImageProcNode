import { Router, Request, Response } from 'express';
const express = require('express');
const {blob} = require("../db"); 

const router: Router = express.Router();

router.post('/', (req: Request, res: Response) => {
    const { fileBuffer } = req.body;
    const base64Image = fileBuffer.toString('base64');
    
});

module.exports = router;
