require('dotenv').config()
const mongoose = require('mongoose');
function mongoDB(){

  mongoose.connect(process.env.MONGO_URL)
  .then(
    console.log("mongodb connected")
  ) 
}

module.exports = mongoDB;