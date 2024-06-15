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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const jwt = require("jsonwebtoken");
const { signup } = require("../db");
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield signup.findOne({ username });
        if (!user || user.password != password) {
            return next(new Error("Wrong password or username"));
        }
        // const {password:removedPassword , _id , __v , ...rest} = user;
        const tokenObj = {
            username: user.username,
            tid: user.tid,
            oid: user.oid,
            aud: user.aud,
            azp: user.azp,
            name: user.name
        };
        console.log(tokenObj);
        let token = jwt.sign(tokenObj, "yash123", { expiresIn: "1h" });
        if (!token) {
            return next(new Error("Token generation failed"));
        }
        res.status(200).json({ msg: "Logged in successfully", jwt: token });
    }
    catch (error) {
        next(error);
    }
}));
module.exports = router;
