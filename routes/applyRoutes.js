const express = require('express');
const router = express.Router();
const Apply = require('../models/applyModel');
const jwt =require('jsonwebtoken');

router.post('/', async (req, res) => {
  try {
    const { jobTitle, name, phone, resumeLink } = req.body;

    const newApplication = await Apply.create({ jobTitle, name, phone, resumeLink });

    res.status(201).json(newApplication);
  } catch (error) {
    console.error('Error submitting job application:', error);
    res.status(500).json({ message: 'Failed to submit job application.' });
  }
});

// router.get('/', async (req, res) => {
//   try {
//     const applicants = await Apply.find();
//     res.status(200).json(applicants);
//   } catch (error) {
//     console.error('Error fetching applicants data:', error);
//     res.status(500).json({ message: 'Failed to fetch applicants data.' });
//   }
// });

router.get('/:token', async(req,res)=>{
  const applicants = await Apply.find();
  try {
      jwt.verify(req.params.token,"ictak",
      (error,decoded)=>{
        if (decoded && decoded.email) {
          res.json(applicants)
        } else {
          res.json({message:"Unauthorized user"});
        }
      })
    } catch (error) {
      res.status(404).send('User is not found');
      console.log(error);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { approved } = req.body;

    const updatedApplication = await Apply.findByIdAndUpdate(id, { approved }, { new: true });

    if (!updatedApplication) {
      return res.status(404).json({ message: 'Job application not found.' });
    }

    res.status(200).json(updatedApplication);
  } catch (error) {
    console.error('Error updating job application:', error);
    res.status(500).json({ message: 'Failed to update job application.' });
  }
});

module.exports = router;
















// const express = require('express');
// const router = express.Router();
// const Apply = require('../models/applyModel');

// // Route to handle job application submission
// router.post('/', async (req, res) => {
//   try {
//     const { job, phone, resumeLink } = req.body;

//     // Create a new job application record in the database
//     const newApplication = await Apply.create({ job, phone, resumeLink });

//     // Return the newly created application data in the response
//     res.status(201).json(newApplication);
//   } catch (error) {
//     console.error('Error submitting job application:', error);
//     res.status(500).json({ message: 'Failed to submit job application.' });
//   }
// });

// module.exports = router;























// const express = require('express');
// const router = express.Router();
// const Apply = require('../models/applyModel');

// // Route to handle job applications
// router.post('/', async (req, res) => {
//   try {
//     const { job, phone, resumeLink } = req.body;

   
//     const newApplication = new Apply({
//       job,
//       user: phone, // Store the phone number as the user identifier
//       resumeLink,
//     });

//     await newApplication.save();
//     res.status(201).json(newApplication);
//   } catch (error) {
//     console.error('Error applying to job:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// module.exports = router;
















// const express = require('express');
// const router = express.Router();
// const Apply = require('../models/applyModel');

// // Route to handle job applications
// router.post('/', async (req, res) => {
//   try {
//     const { job, resumeLink } = req.body;

//     const newApplication = new Apply({
//       job,
//       resumeLink,
//    
//     });

//     await newApplication.save();
//     res.status(201).json(newApplication);
//   } catch (error) {
//     console.error('Error applying to job:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// module.exports = router;
