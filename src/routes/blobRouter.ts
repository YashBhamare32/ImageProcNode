import { Router, Request, Response } from 'express';
const express = require('express');

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.json({
        msg: 'Hello from blob api',
    });
});

module.exports = router;
