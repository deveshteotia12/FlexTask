const database = require("../../shared/database")
const bcrypt=require("bcrypt");
const jwt = require('jsonwebtoken');
const config = require("../../config/index");
const {ObjectId}=require("bson")




const userSubscribeHandler=async ({ userID,slotID})=>{
    try{

        const subscribedOn=new Date();
        const databaseResponse = await (await database()).collection('slot').updateOne({_id: new ObjectId(slotID)},{$push :{users : {userID,subscribedOn}}});
        if(!databaseResponse)
        {
            throw{ code : 401, message: 'internal server error'};
        }
        const response= await (await database()).collection('user').updateOne({_id:  new ObjectId(userID)},{$set :{subscriptionCheck : true,subscribedSlot: slotID}});

        return;

    }catch(error){
        console.log(error)
        throw{ code : 500, message: 'internal server error'};
    
}
}
const getSlotsData=async ()=>{
    try{

        const databaseResponse = await (await database()).collection('slot').find({}).toArray();
        console.log(databaseResponse)
        return databaseResponse;

    }catch(error){
        console.log(error)
        throw{ code : 500, message: 'internal server error'};
    }
}

const sendSlotData=async ({slotID})=>{
    try{
        const databaseResponse = await (await database()).collection('slot').findOne({_id:  new ObjectId(slotID)});

        if(!databaseResponse)
        {
            throw{code : 401, message: "Some Error has occured"};
        }

        return databaseResponse;

    }catch(error){
        throw{ code : 500, message: 'internal server error'};
    }
}

module.exports={userSubscribeHandler,getSlotsData,sendSlotData};