const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String, required: true },
  jobType: { type: String, required: true },
  qualifications: { type: String, required: true },
  skills: { type: String, required: true },
  jobDescription: { type: String, required: true },
  experience: { type: String, required: true },
  contactDetails: { type: String, required: true },
  lastDate: { type: Date, required: true },
  approved: { type: Boolean, default: false }, // New field for the approved condition
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;



















// const mongoose = require('mongoose');

// const jobSchema = new mongoose.Schema({
//   jobTitle: { type: String, required: true }, 
//   companyName: { type: String, required: true },
//   location: { type: String, required: true },
//   salary: { type: String, required: true },
//   jobType: { type: String, required: true },
//   qualifications: { type: String, required: true },
//   skills: { type: String, required: true },
//   jobDescription: { type: String, required: true },
//   experience: { type: String, required: true },
//   contactDetails: { type: String, required: true },
//   lastDate: { type: Date, required: true },
// });

// const Job = mongoose.model('Job', jobSchema);

// module.exports = Job;
