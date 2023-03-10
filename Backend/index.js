const express=require("express");

const app=express();

require("dotenv").config();

const {connection} =require("./configs/db");

app.use(express.json());    

const {userRouter}=require("./routes/User.route")

const {notesRouter}=require("./routes/Note.route")

const {authenticate}=require("./middlewares/authenticate.middleware")

const cors=require("cors");

app.use(cors());

app.get("/",(req,res)=>{
    res.send("Welcome to Home Page")
})

app.use("/users",userRouter);
app.use(authenticate);
app.use("/notes",notesRouter);

app.listen(process.env.port,async ()=>{
    try{
        await connection;
    }catch(err){
        console.log("Something went wrong");
        console.log(err)
    }
    console.log("Running Server")
})