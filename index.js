import  express  from "express";
import colors from  "colors";
import dbConnection from "./Database/db.js";
import dotenv from "dotenv";
import cors from "cors";
import User from "./Database/User.js";

const app=express();
dbConnection();
dotenv.config();
app.use(express.json());
app.use(cors());


app.post("/Register" ,async(req, res)=>{
    let data=await new User(req.body);
    let result=await data.save();
    res.send(result);
})
const p=process.env.port ||5000;
app.listen(p, ()=>{
    console.log(`the server is ${p}` .bgRed );
})
