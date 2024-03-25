import mongoose from "mongoose";

const dbConnection=()=>{
    try{
      mongoose.connect("mongodb://localhost:27017/Formdata");
      console.log("database is connected successfully" .bgGreen);
    }
    catch(error){
     console.log("database is not connected sucessfully" .bgRed);
    }
}

export default dbConnection;