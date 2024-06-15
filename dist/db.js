"use strict";
const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.connect("mongodb://localhost:27017/imageNode");
const signupSchema = new Schema({
    username: String,
    password: String,
    tid: Number,
    oid: Number,
    aud: Number,
    azp: Number,
    name: Array
});
const blobSchema = new Schema({
    id: Number,
    token: String,
    base64Image: String,
    status: String
});
const signup = mongoose.model("signup", signupSchema);
const blob = mongoose.model("blob", blobSchema);
module.exports = {
    signup,
    blob
};
