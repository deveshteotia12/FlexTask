const {schedule}=require('node-cron')
const database = require("./database")

const startScheduler=async ()=>{
    try{
       // const month=new Date().getMonth();
        const task=schedule('55 23 30 * *',async ()=>{
            await (await database()).collection('slot').updateMany({},{$set :{users : []}});
            await (await database()).collection('user').updateMany({},{$set: {subscriptionCheck : false }})
        })
        task.start();
    }catch(error){
       console.log(error);
    }
}

module.exports=startScheduler;