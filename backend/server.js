import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connectDB} from './config/database.js';
import authRoutes from './routes/userRoute.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await connectDB();

app.get('/',(req,res)=>{
    res.send("Hire Helper Backend Server is running");
})

app.use('/api', authRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
    
})