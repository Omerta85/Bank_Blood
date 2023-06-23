const express = require('express');
const dotenv = require('dotenv');
const colors = require("colors");
const morgan = require('morgan');
const cors = require('cors');
const {connectDB} = require("./config/db");
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
app.use('/api/v1/test', require('./routes/testRoutes'));

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
    console.log(`Node Server Running In ${process.env.DEV_MODE} Mode On PORT ${process.env.PORT}`
        .bgBlue.white
    );
})