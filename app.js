require('dotenv').config()
const express=require('express');
const app=express();
const morgan = require('morgan');

const cookieParser=require("cookie-parser");
const cors=require("cors");
const fileUpload=require("express-fileupload");


//temp check
app.set("view engine","ejs");

//morgan middleware
app.use(morgan('combined'));

//regular middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
//cookies and file middleware
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/',
}));

//import all route here
const home=require("./routes/home");
const user=require("./routes/user");
const payment=require("./routes/payment")
//Router middleware
app.use("/api/v1",home);
app.use("/api/v1",user);
app.use("/api/v1",payment)


app.get("/signuptest",(req,res)=>{
    res.render("signuptest")
})

module.exports=app;


