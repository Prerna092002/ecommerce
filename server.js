import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js'
import cors from 'cors';
//config environment variables
dotenv.config();

//database config
connectDB();

//rest objects
const app = express();

//middleware
app.use(cors);
app.use(express.json());
app.use(morgan('dev'));
//routes
 app.use("/api/v4/auth", authRoute);

app.get('/',(req,res)=>{
    res.send({
        message:"Welcome to ECommerce website",
    })
})
const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server listening on ${process.env.DEV_MODE} mode ${PORT}`.bgCyan.white);
})