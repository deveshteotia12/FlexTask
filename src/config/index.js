require('dotenv').config();


module.exports= {
    port: parseInt(process.env.PORT) || 5000,

    //MONGODB URI
    databaseURL: process.env.MONGO_URL,

    //JWT SECRET KEY
    jwtKEY: process.env.JWT_KEY
  
}