const express=require('express');
const Router=express.Router();
const userRoute=require('./user/router.js')
const slotsRoute=require("./slots/router.js")

Routes= ()=>{
  
    Router.use("/user",userRoute());
    Router.use("/slot",slotsRoute());

    return Router;
}

module.exports=Routes;