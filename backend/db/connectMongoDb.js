const mongoose=require("mongoose")



const connectMongoDb = async() => {
    try {
        const conect = await mongoose.connect(process.env.MONDO_URI);
        console.log(`MongoDb connected`);
    } catch (error) {
        console.log(`Error connection to mongoDb:${error.message}`);
        process.exit(1); 
  }
}

module.exports = connectMongoDb;
