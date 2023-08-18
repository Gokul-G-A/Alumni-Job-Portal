const express = require('express');
const router = express.Router();
const Job = require('../models/jobModel');
const jwt = require('jsonwebtoken')

router.post('/jobs', (req, res) => {
  try {
    const {
      jobTitle,
      companyName,
      location,
      salary,
      jobType,
      qualifications,
      skills,
      jobDescription,
      experience,
      contactDetails,
      lastDate,
    } = req.body;

    const newJob = new Job({
      jobTitle,
      companyName,
      location,
      salary,
      jobType,
      qualifications,
      skills,
      jobDescription,
      experience,
      contactDetails,
      lastDate,
      approved: false, // Set the 'approved' status to false initially
    });

    jwt.verify(req.body.token,"ictak",
    (error,decoded)=>{
      if (decoded && decoded.email) {
        newJob.save();
        // res.status(201).json(newJob);
        res.json({message:"Job added successfully"})
      } else {
        res.json({message:"Unable to add job"})
      }
    }
    )
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.send(jobs);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
    
  }
});
router.get('/jobs1/:token', async (req, res) => {
   const jobs1 = await Job.find();
  try {
    jwt.verify(req.params.token,"ictak",
    (error,decoded)=>{
      if (decoded && decoded.email) {
        res.json(jobs1)
      } else {
        res.json({message:"Unauthorized user"});
      }
    })
    // res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }

});
  // const jobs = await Job.find();
//   try {
//     jwt.verify(req.params.token,"ictak",
//     (error,decoded)=>{
//       if (decoded && decoded.email) {
//         res.json(jobs)
//       } else {
//         res.json({message:"Unauthorized user"});
//       }
//     })
//     // res.status(200).json(jobs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });


// router.get('/jobs/:token', async (req, res) => {
//   const jobs = await Job.find();
//   try {
//     jwt.verify(req.params.token,"ictak",
//     (error,decoded)=>{
//       if (decoded && decoded.email) {
//         res.json(jobs)
//       } else {
//         res.json({message:"Unauthorized user"});
//       }
//     })
//     // res.status(200).json(jobs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

router.put('/jobs/:id', async (req, res) => {
  try {
    const jobId = req.params.id;
    const updatedJobData = req.body;
    const updatedJob = await Job.findByIdAndUpdate(jobId, updatedJobData, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.delete('/jobs/:id', async (req, res) => {
  try {
    const jobId = req.params.id;

    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// router.delete('/jobs/:id', async (req, res) => {
//   try {
//       const deleteId = req.params.id;
//       const token = req.headers.authorization;

//       console.log('Received token:', token);

//       jwt.verify(token, "ictak", async (error, decoded) => {
//           if (error) {
//               console.error('Token verification error:', error);
//               res.status(401).json({ message: "Unauthorized User" });
//           } else {
//               try {
//                   await Job.findByIdAndDelete(deleteId);
//                   console.log('Deleted');
//                   res.json({ message: "Deleted Successfully" });
//               } catch (deleteError) {
//                   console.error('Delete error:', deleteError);
//                   res.status(500).json({ message: "Unable to delete" });
//               }
//           }
//       });
//   } catch (error) {
//       console.error('Server error:', error);
//       res.status(500).json({ message: "Internal Server Error" });
//   }
// });


module.exports = router;
