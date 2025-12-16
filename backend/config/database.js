import mongoose from 'mongoose';

export const  connectDB = async()=>{
   try{
    await mongoose.connect(process.env.URL);
    console.log("Database connected successfully");
   }catch(error){
    console.log("Database connection failed", error);
    process.exit(1);
   }
}