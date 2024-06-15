import { Router } from 'express';
const express = require('express');
const jobRouter = require('./jobRouter');
const blobRouter = require('./blobRouter');
const loginRouter = require("./loginRouter")
const signupRouter = require("./signupRouter")

const router: Router = express.Router();

router.use('/job', jobRouter);
router.use('/login', loginRouter);
router.use("/signup" , signupRouter)
router.use('/blob', blobRouter);

module.exports = router;
