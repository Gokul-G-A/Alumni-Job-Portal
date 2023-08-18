const mongoose= require('mongoose');
mongoose.connect("mongodb+srv://ictakjobportal:jp1234@cluster0.d2gurng.mongodb.net/jobportal?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true, w: 'majority' })
.then(()=>{
    console.log(`Connected to the database`)
})
.catch(()=>{
    console.log(`Error ! cannot connect to database`)
})