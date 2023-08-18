const mongoose=require('mongoose');
const userProfileSchema = mongoose.Schema({
userId:String,
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
phone:{
    type:Number,
    required:true
},
qualification:{
    type:String,
    required:true
    
},
course:{
    type:String,
    required:true
},
batch:{
    type:String,
    required:true
},
status:{
    type:String,
    required:true
},
company:{
    type:String,
}
});
const userProfileModel = mongoose.model("profiles", userProfileSchema);
module.exports = userProfileModel;