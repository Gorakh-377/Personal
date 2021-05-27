const { json } = require('express');
const express=require('express')
const jwt =require('jsonwebtoken')
const router=express.Router();
const bcrypt = require('bcrypt');


 require('../dbs/conn')
 const User=require('../model/userSchema')


router.get('/',(req,res)=>{
    res.send("Hii my name is gorakh wagh ")

})
router.post('/signin', async (req,res)=>{
    const {name,email,mobile,profession,password,cpassword}=req.body;
    if(!name||!email||!mobile||!profession||!password||!cpassword)
    {
        return res.status(422).json("plz filled all field")
    }
    try {
 const userExist=await User.findOne({email:email});
   
       if(userExist){
           return res.status(422).json({error:"user already exit"})
       }

       const user=new User({name,email,mobile,profession,password,cpassword});
       
       
       const userRegister=await user.save();

     if(userRegister){
         res.status(201).json({message:"user register succesfully"});

     }
     else{
        res.status(501).json({error:"user  failed register "});
     }
        
    } catch (error) {
        console.log(err)
        
    }
   
})
// login route
router.post('/login', async (req,res)=>{
    try {
        let token;
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({error:"plz filled all field "});
        }
        const userlogin= await User.findOne({email:email});
            
        if(userlogin){
            
            const match=await bcrypt.compare(password,userlogin.password)
         
             token= await userlogin.generateAuthToken();
             console.log(token)
             res.cookie("jwttoken",token,{
                 expires:new Date(Date.now()+25892000000),
                 httpOnly:true
             });
         



            if(!match){
                res.status(501).json({error:"User not match"})
                
           }
           else{
               res.status(222).json({message:"succesfully sign in"})
   
           }

        }
        else{
            res.status(501).json({error:"User not found"})
                

        }


         
        
    

    } catch (err) {
        console.log(err)
        
    }

});
module.exports=router;