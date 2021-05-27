const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const app=express();
dotenv.config({path:'./Config.env'});

require('./dbs/conn')
// const User=require('./model/userSchema')

app.use(express.json())
app.use(require('./routers/auth'))

const port=process.env.PORT;


// const middle= (req,res ,next)=>{
    // console.log("goodnight")
    // next();
// }
// rI6QsY3iMf7gSYLS


// app.get("/", middle,(req,res)=>{
//     res.send("hollo good")

// })
app.get("/home",(req,res)=>{
    res.cookie("test","tappa")
    res.send("hollo good home")

})
app.get("/about",(req,res)=>{
    
    res.send("maske chi gand")

})
app.listen( 3000,() => {
    console.log(`starting at ${port}`)
})