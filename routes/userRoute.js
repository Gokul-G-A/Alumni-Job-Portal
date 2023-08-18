const express= require('express');
const router= express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}));

const jwt =require('jsonwebtoken');

const userModel= require('../models/userModel');

//to get the list of alumni
router.get('/userlist', async(req,res)=>{
    try {
        const role = "alumni";
        const data = await userModel.find({role:role})
        res.send(data);
    } catch (error) {
        res.status(404).send('Data is not found');
        console.log(error);
    }
});
//to get the list of employers
router.get('/employerlist', async(req,res)=>{
    try {
        const role = "employer";
        const data = await userModel.find({role:role})
        res.send(data);
    } catch (error) {
        res.status(404).send('Data is not found');
        console.log(error);
    }
});

//to get the list of all users(both alumni and employer)
router.get('/list', async(req,res)=>{
    try {
        const data = await userModel.find();
        res.send(data);
    } catch (error) {
        res.status(404).send('Data is not found');
        console.log(error);
    }
});

//login api

router.post('/login', async(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    const user =await userModel.findOne({username:username})
    if(!user){
        res.json({message:"user is not found"})
    }
    try {
        if(user.password==password){
            jwt.sign({email:username,id:user._id},"ictak",{expiresIn:'1d'},
            (error,token)=>{
                if (error) {
                    res.json({message:"Token not generated"});
                } else {
                    res.json({message:"Login successfully",token:token,data:user})
                }
            }
)}
            // res.json({message:"Login successfully"})
        else{ 
            res.json({message:"login failed"});
        }
    } catch (error) {
        console.log(error);
    }

});

router.post('/signup', async(req,res)=>{
    try {
        console.log(req.body)
        let item= req.body;
        const newUser= new userModel(item);
        const savedData= await newUser.save();
        res.json({message:"Sign up successfull"})
    } catch (error) {
        res.json({message:"Unable to register"});
    }
})

router.delete('/deleteone/:id', async (req, res) => {
    try {
        const deleteId = req.params.id;
        const token = req.headers.authorization;

        console.log('Received token:', token);

        jwt.verify(token, "ictak", async (error, decoded) => {
            if (error) {
                console.error('Token verification error:', error);
                res.status(401).json({ message: "Unauthorized User" });
            } else {
                try {
                    await userModel.findByIdAndDelete(deleteId);
                    console.log('Deleted');
                    res.json({ message: "Deleted Successfully" });
                } catch (deleteError) {
                    console.error('Delete error:', deleteError);
                    res.status(500).json({ message: "Unable to delete" });
                }
            }
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});





// router.delete('/deleteone/:id', async (req,res)=>{
//     try {
//         const deleteId =req.params.id;
//         console.log(deleteId);
//         await userModel.findByIdAndDelete(deleteId);
//         console.log('Deleted');
//         res.json({message:"Deleted Successfully"});


//     } catch (error) {
//         res.json({message:"Unable to delete"});
//     }
// })




module.exports=router;