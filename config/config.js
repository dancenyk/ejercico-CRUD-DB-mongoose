const mongoose = require("mongoose");
require ("dotenv").config();

const dbConnection =async() =>{
    try{
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Base de datos super conectada");
    }catch (error){
        console.error(error);
        throw new Error ("Error a la hora de iniciar la base de datos", error)
    }
}; 

module.exports ={
    dbConnection,
}; 



