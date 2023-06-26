import express from 'express';
import dotenv from 'dotenv';
import colors from "colors";
import morgan from 'morgan';
import cors from 'cors';

import connectDB from './config/db.js';
import testRouters from './routes/testRoutes.js';
import authRouters from './routes/authRouters.js';
import inventoryRoutes from "./routes/inventoryRoutes.js";
//dot config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();


//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


//routes
//1test
app.use(`/api/v1/test`, testRouters);
app.use('/api/v1/auth', authRouters);
app.use('/api/v1/inventory', inventoryRoutes);

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
    console.log(`Node Server Running In ${process.env.DEV_MODE} Mode On PORT ${process.env.PORT}`
        .bgBlue.white
    );
})