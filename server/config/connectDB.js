import mongoose from "mongoose";


const connectionToDB = async () => {
    try{
        const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.v2jiv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
 
        const connect = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB Connected!`);

    }
    catch(error){
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};


export default connectionToDB;