import mongoose from "mongoose";

const connectDB = async() => {
     try{
        await mongoose.connect(process.env.MONGO_URI);
       console.log("DB Connected");
    }
       catch (error) {
        console.log("Error while connecting with the database " ,error);
    }
}

export default connectDB;