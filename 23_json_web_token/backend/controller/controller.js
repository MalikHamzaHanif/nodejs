const { BadRequest, UnAuthorized } = require("../error");
const asyncWrapper = require("../middleware/asyncWrapper");
const jwt =require("jsonwebtoken");

const getUserData=asyncWrapper(async(req,res)=>{
    const {name}=req.user;
    const random=parseInt(Math.random()*100)
   res.status(200).json({name,random})
})


const loginUser=asyncWrapper(async(req,res)=>{
    let {name,password}=req.body;
    console.log("req");
    let id=new Date().toISOString();
    const token=jwt.sign({name,id},process.env.SECRET_KEY,{expiresIn:'3d'})
    res.status(200).json({name,token});
    
})

module.exports={getUserData,loginUser}