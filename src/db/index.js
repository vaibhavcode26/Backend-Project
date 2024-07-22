import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("Database connected")
    } catch (error) {
        console.log("Database connection Failed")
        process.exit(1)
    }
}

export default connectDB