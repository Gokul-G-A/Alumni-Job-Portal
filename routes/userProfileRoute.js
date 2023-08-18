const express= require('express');
const router= express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}));

const jwt =require('jsonwebtoken');

const userProfileModel = require('../models/userProfileModel');

router.get('/profiles/:token', async(req,res)=>{
    const data = await userProfileModel.find();
    try {
        jwt.verify(req.params.token,"ictak",
        (error,decoded)=>{
          if (decoded && decoded.email) {
            res.json(data) 
          } else {
            res.json({message:"Unauthorized user"});
          }
        })
      } catch (error) {
        res.status(404).send('User is not found');
        console.log(error);
    }
});

router.post('/createprofile', async(req,res)=>{
    try {
        console.log(req.body);
        let item= req.body;
        const saveddata=new userProfileModel(item);
        jwt.verify(req.body.token,"ictak",
        (error,decoded)=>{
            if(decoded && decoded.email){
                saveddata.save();
                res.json({message:"Profile created succesfully"})
            }
            else{
                res.json({message:"Unable to Submit"})
            }
        }
        )     
        
    } catch (error) {
        console.log(error);
        res.json({message:"Unable to submit"})
         
    }
});

router.put('/updateprofile/:id', async(req,res)=>{
    try {
        console.log(req.body);
        const postId= req.params.id;
        console.timeLog(postId);
        const updated = await userProfileModel.findByIdAndUpdate(postId,req.body);
        res.json({message:"Updated Successfully "});
    } catch (error) {
        console.log(error.message);
        res.status(400).json("Unable to update");
    }
})

module.exports=router;