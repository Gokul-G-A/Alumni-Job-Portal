const express=require('express')
const mongoose=require('mongoose')
const morgan=require('morgan')
const app=express();
var cors = require('cors');
app.use(cors());
require('dotenv').config();
require('./db/mongodb');
app.use(morgan("dev"));

const path = require('path'); 
app.use(express.static(path.join(__dirname,'/build')));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type ");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})


const jobRoutes = require('./routes/jobRoutes');
const userRoute=require('./routes/userRoute');
const applyRoutes = require('./routes/applyRoutes');
const userProfileRoute= require('./routes/userProfileRoute.js')

app.use('/api',userRoute);

app.use('/api', jobRoutes);
app.use('/api/apply', applyRoutes);
app.use('/api', userProfileRoute);



app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/build/index.html'));
 });


const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
});
