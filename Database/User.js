import mongoose from "mongoose";

let schema=new mongoose.Schema(
    {
        firstname:{
            type:String,
            required:[true,"Enter your first name"]
          },
          lastname:{
            type:String,
            required:[true,"Enter your last name"],
          },
         
          CNIC:{
            type:String,
            required:[true, "Enter your unique CNIC not repeat"],
            unique:true,
          },
          option:{
            type:[String],
            required:true,
          },
          number:{
            type:String,
            required:[true, "Enter your number not repeating"],
            unique:true,
          },
          email:{
            type:String,
            required:[true,"Enter your email not repeating "],
            unique:true,
          },
          password:{
            type:String,
            required:true,
            trim:true,
          },
          confirm_password:{
            type:String,
            required:true,
            trim:true,
          },
    },

    {timestamps:true}
)
const User=mongoose.model("forms",schema);
export default User;