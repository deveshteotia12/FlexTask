const { Db, MongoClient } =require( 'mongodb');
const config=require('../config/index')


let db;

async function initializeClient() {
  try {
    const client = await MongoClient.connect(config.databaseURL);
    return client.db();
  } catch (err) {
    console.log('Error connecting to database!');
    console.log(err)
  }
}

module.exports= async () => {
  if (!db) {
    db = await initializeClient();
  }

  return db;
};