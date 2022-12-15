const database = require("../../shared/database")
const bcrypt=require("bcrypt");
const jwt = require('jsonwebtoken');
const config = require("../../config/index");


const signUpHandler=async ({email,password, subscriptionCheck,detailsUpload})=>{
    try{ 
        const databaseResponse = await (await database()).collection('user').findOne({ email: email });
        console.log(databaseResponse)
        if (databaseResponse !== null) throw Error('User already exists');
        const newUser={
            email,
            password: await bcrypt.hash(password,14),
            subscriptionCheck,
            detailsUpload
        }
        await (await database()).collection('user').insertOne(newUser);

    }catch(error){
        console.log(error)
        throw{ code : 500, message: 'internal server error'};
    }
}

const loginHandler=async ({email,password})=>{
    try{ 
    
        console.log(email)
        const databaseResponse = await (await database()).collection('user').findOne({ email: email });
        console.log(databaseResponse);
        if (databaseResponse === null) throw Error('User does not exist');
        if (!(await bcrypt.compare(password, databaseResponse.password))) throw Error('Invalid credentials');
        return await jwt.sign({ email: email },config.jwtKEY);

    }catch(error){
        console.log(error)
        throw{ code : 500, message: 'internal server error'};
    }
}

const userInfoHandler=async ({ email,
    name,
    contactNo,
    emergencyContact,
    gender,
    address,
    age})=>{
    try{
        const databaseResponse = await (await database()).collection('user').updateOne({ email: email },{$set: {name,
            contactNo,
            emergencyContact,
            gender,
            address,
            age,detailsUpload: true}});

        return;
    }catch(error){
        console.log(error)
        throw{ code : 500, message: 'internal server error'};
    }
}

const sendUserData=async (email)=>{
    try{
        const databaseResponse = await (await database()).collection('user').findOne({ email});
        if(!databaseResponse){
            throw {code : 404, message: 'some error has occured'};
        }
            
        return databaseResponse
        
    }catch(error){
        console.log(error)
        throw{ code : 500, message: 'internal server error'};
    }
   
}


module.exports={signUpHandler,loginHandler,userInfoHandler,sendUserData}