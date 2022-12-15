const express=require('express');
const Router=express.Router();
const validateRequest=require("../../shared/middlewares/validation")
const {userLoginSchema,userDataSchema}=require("../user/schema");
const { loginHandler,signUpHandler,sendUserData,userInfoHandler } = require('./controller');
const authMiddleware=require('../../shared/middlewares/authentication')

const userRoute=()=>
{
    Router.get('/',authMiddleware,handelSendData);
    Router.post('/signUp',validateRequest('body',userLoginSchema),handelSignUp);
    Router.post("/login",handelLogin);
    Router.post("/userInfo",authMiddleware,validateRequest('body',userDataSchema),handelUserInfo)
    Router.get("/userInfo",authMiddleware,handelGetUserInfo)
    return Router;
}

const handelSendData=(req,res)=>{

     res.send({success: true,message: "User is Authenticated",payload: {data: req.user}})
}

const handelSignUp=async (req,res)=>{
    try{
        await signUpHandler(req.body);
        res.json({success: true, message: 'User successfully signed In'})
    }catch(error){
        res.json({success: false,message: error.message});
    }
}
const handelLogin=async (req,res)=>{
    try{
        const token=await loginHandler(req.body);
        res.json({success: true, message: 'User successfully signed In',payload: {token}})
    }catch(error){
        res.json({success: false,message: error.message});
    }
}

const handelUserInfo=async (req,res)=>{
    try{
        console.log(req.body);
        await userInfoHandler(req.body)
        res.json({success: true,message: 'Successfully saved Data'})
    }catch(error){
        res.json({success: false,message: error.message})
    }
}

const handelGetUserInfo= async (req,res)=>{
    try{
           console.log(req.user);
           let data=await sendUserData(req.user.email);
            res.json({success: true,message: "Data successfully fetched", payload: data})
    }catch(error){
       res.json({success: false,message: error.message})
    }
}

module.exports=userRoute;