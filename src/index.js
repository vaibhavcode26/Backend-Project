import {app} from  './app.js'
import connectDB from "./db/index.js";
import dotenv from "dotenv"
dotenv.config({
    path : './.env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 7000 , ()=>{
        console.log(`App is running on Port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log(`MongoDB connection Failed ` , err)
})



