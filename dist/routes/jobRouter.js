"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const form_data_1 = __importDefault(require("form-data"));
const axios = require("axios");
const express = require('express');
const jwt = require("jsonwebtoken");
const { blob } = require("../db");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
let jobIdCounter = 1;
router.post('/', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.json({
            msg: "Wrong or no headers present"
        });
    }
    if (!req.file) {
        return res.status(400).send("No file uploaded");
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, "yash123");
        console.log(decoded);
        const fileBuffer = req.file.buffer; //filebuffer has the image
        const formData = new form_data_1.default();
        formData.append('image', fileBuffer, {
            filename: 'image.jpg',
            contentType: 'image/jpeg'
        });
        formData.append('token', token);
        try {
            const response = yield axios.post("http://localhost:3000/api/v1/blob", formData, {
                headers: Object.assign(Object.assign({}, formData.getHeaders()), { Authorization: authHeader // Preserve original authorization header
                 })
            });
            console.log(response);
            if (response.status !== 200) {
                return res.status(response.status).json({ msg: 'Blob API returned an error', error: response.data });
            }
            return res.json({
                msg: "File uploaded and converted to base64",
                jobData: response.data.newBlob
            });
        }
        catch (error) {
            return res.json({
                msg: "Error from blob api",
                error
            });
        }
    }
    catch (error) {
        return res.status(403).json({
            msg: "Error handled in job api",
            Error: error
        });
    }
}));
router.get("/", (req, res) => {
    res.json({
        msg: "API is working"
    });
});
router.get("/status/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jobId = parseInt(req.params.id);
    const existingJob = yield blob.findOne({ id: jobId });
    if (!existingJob) {
        console.log("No job found");
        return res.json({
            msg: "Job does not exist"
        });
    }
    const status = existingJob.status;
    return res.json({
        jobId,
        status
    });
}));
module.exports = router;
