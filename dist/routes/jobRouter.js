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
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const jwt = require("jsonwebtoken");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "storage/" });
router.post('/', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.json({
            msg: "Wrong or no headers present"
        });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, "yash123");
        console.log(decoded);
        const { image } = req.file;
        console.log(ImageData);
        if (!image) {
            return res.json({
                msg: "No image or wrong image"
            });
        }
        const base64Image = image.buffer.toString('base64');
        return res.json({
            base64: base64Image
        });
    }
    catch (error) {
        return res.status(403).json({
            Error: error
        });
    }
}));
module.exports = router;
