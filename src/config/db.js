const mongoose = require('mongoose');

const connectdb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully!!")
    }
    catch(error){
        console.log(`Error in establishing database connection`)
        console.log(error.message)
    }    
}

module.exports = connectdb;


// is file ke through mongo database connect kar rahe hai