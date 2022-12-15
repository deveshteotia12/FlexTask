const express=require('express');
const Router=express.Router();
const validateRequest=require("../../shared/middlewares/validation")
const {userSubscribeSchema}=require("./schema");
const {userSubscribeHandler,getSlotsData,sendSlotData} = require('./controller');
const authMiddleware=require('../../shared/middlewares/authentication')

const slotsRoute=()=>
{
    Router.get('/',authMiddleware,handelSendData);
    Router.post("/subscribe",authMiddleware,validateRequest('body',userSubscribeSchema),handelUserSubscribe)
    Router.post("/sendSlotData",authMiddleware,handelSendSlotData)
    return Router;
}

const handelSendData=async (req,res)=>{
    try{
        const data= await getSlotsData();
        res.json({success: true,payload: data});
    }catch(error)
    {
        res.json({success: false,message: error.message});
    }
}


const handelUserSubscribe=async (req,res)=>{
    try{
        console.log(req.body);
        await userSubscribeHandler(req.body)
        res.json({success: true,message: 'Successfully saved Data'})
    }catch(error){
        res.json({success: false,message: error.message})
    }
}

const handelSendSlotData=async (req,res)=>{
    try{
        console.log(req.body);
        const data=await sendSlotData(req.body)
        res.json({success: true,payload: data})
    }catch(error){
        res.json({success: false,message: error.message})
    }
}


module.exports=slotsRoute;