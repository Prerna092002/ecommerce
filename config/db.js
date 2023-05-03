import mongoose from 'mongoose';
import colors from 'colors';
// import {registerController} from '../controllers/authController.js';
// import {authRoute} from '../routes/authRoute.js';

const connectDB=async()=>{
    try{
       const conn=await mongoose.connect(process.env.MONGO_URI);
       console.log(`Connected to MongoDB database: ${conn.connection.host}`.bgMagenta.white);
    } catch(e){
        console.log(`Error connecting to Mongoose database: ${e}`.bgRed.white);
    }
}

export default connectDB;