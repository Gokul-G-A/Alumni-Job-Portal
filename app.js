const express=require('express')
const mongoose=require('mongoose')
const morgan=require('morgan')
const app=express();
var cors = require('cors');
app.use(cors());

const jobRoutes = require('./routes/jobRoutes');
const userRoute=require('./routes/userRoute');
const applyRoutes = require('./routes/applyRoutes');
const userProfileRoute= require('./routes/userProfileRoute.js')

app.use('/api',userRoute);

app.use('/api', jobRoutes);
app.use('/api/apply', applyRoutes);
app.use('/api', userProfileRoute);

require('dotenv').config();
require('./db/mongodb');
app.use(morgan("dev"));
const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
});