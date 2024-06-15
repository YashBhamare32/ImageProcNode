import { Router, Request, Response } from "express";
const express = require("express");
const { blob } = require("../db");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const router: Router = express.Router();

let jobIdCounter:number = 1;

interface Blob {
  id: number;
  token: string;
  base64Image: string;
  status: string;
}

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/",
  upload.single("image"),
  async (req: Request, res: Response) => {
    
    const {token} = req.body;
    console.log(token);
    
    if (!req.file) {
      return res.status(400).json({
        msg: "No file uploaded.",
      });
    }

    const fileBuffer = req.file.buffer;

    try {

      const base64Image = fileBuffer.toString("base64");

      const newBlob = await blob.create({
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
    } catch (error) {
        console.log(error);
      return res.status(403).json({
        msg: "Forbidden. Invalid or expired token.",
        Error: error,
      });
    }
  }
);

router.get("/:id", async (req: Request, res: Response) => {
  const blobId = parseInt(req.params.id);
  const existingBlob = await blob.findOne((b: Blob) => b.id === blobId);

  if (!existingBlob) {
    return res.status(404).json({
      msg: "Blob not found",
    });
  }

  return res.json(existingBlob);
});

module.exports = router;
