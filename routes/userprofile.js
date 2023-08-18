const express=require('express');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const profile=require('../models/userProfile')

//POST

router.post('/profile',async(req,res)=>{
    try {
        let item=req.body;
        const newData=profile(item);
        await newData.save();
        
        res.status(200).send('Registration successfull');
    } catch (error) {
        res.status(400).send('Registration failed');
        console.log(error);
    }
});

//GET

router.get('/getdata',async(req,res)=>{
    try {
        const data= await profile.find();
        res.send(data);
    } catch (error) {
        res.status(404).send('Data not found');
        console.log(error)
    }
})
module.exports=router;



