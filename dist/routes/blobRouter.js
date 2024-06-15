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
const express = require("express");
const { blob } = require("../db");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const router = express.Router();
let jobIdCounter = 1;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post("/", upload.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    console.log(token);
    if (!req.file) {
        return res.status(400).json({
            msg: "No file uploaded.",
        });
    }
    const fileBuffer = req.file.buffer;
    try {
        const base64Image = fileBuffer.toString("base64");
        const newBlob = yield blob.create({
            id: jobIdCounter++,
            token,
            base64Image,
            status: "Pending",
        });
        if (!newBlob) {
            return res.status(500).json({
                msg: "Error creating blob.",
            });
        }
        return res.json({
            msg: "Blob created successfully",
            newBlob,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({
            msg: "Forbidden. Invalid or expired token.",
            Error: error,
        });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blobId = parseInt(req.params.id);
    const existingBlob = yield blob.findOne((b) => b.id === blobId);
    if (!existingBlob) {
        return res.status(404).json({
            msg: "Blob not found",
        });
    }
    return res.json(existingBlob);
}));
module.exports = router;
