const express=require('express');
const config=require('./config/index')
const cors=require('cors')
const route=require("./api/index");
const startScheduler = require('./shared/scheduler');


const startServer=()=>{
    const app=express();
    app.use(cors());
    app.use(express.json());
    app.use("/",route());

    app.listen(config.port,()=>{
        console.log('RUNNING')
    })

    startScheduler();
}

startServer();