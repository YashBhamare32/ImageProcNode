const mongoose = require("mongoose");
const {Schema} = mongoose;
mongoose.connect("mongodb://localhost:27017/imageNode");

const signupSchema = new Schema({
    username:String ,
    password:String ,
    tid:Number , 
    oid:Number , 
    aud:Number , 
    azp:Number , 
    name:Array});



const signup = mongoose.model("signup" , signupSchema);
// const login = mongoose.model("login" , signupSchema);

module.exports = {
    signup
};