 import mongoose from "mongoose"


const UserSchema=new mongoose.Schema({
  username:{
    type:String,
    required:[true,"Please Provide a Username"],
    unique:true
  },
  email:{
    type:String,
    required:[true,"Please Provide a Email"],
    unique:true
  },
  password:{
    type:String,
    required:[true,"Please Provide a Password"],
  },
  isVerified:{
    type:Boolean,
    default:false
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
 
  forgetPasswordToken:String,
  forgetPasswordTokenExpiry:Date,
  verifyToken:String,
  verifyTokenExpiry:Date,


},
 


)

const User=mongoose.models.users || mongoose.model("users",UserSchema);

export default User;