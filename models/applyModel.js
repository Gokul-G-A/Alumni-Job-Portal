const mongoose = require('mongoose');

const applySchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  resumeLink: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

const Apply = mongoose.model('applies', applySchema);

module.exports = Apply;
















// const mongoose = require('mongoose');

// const applySchema = new mongoose.Schema({
//   job: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Job',
//     required: true,
//   },
//   phone: {
//     type: Number,
//     required: true,
//     // validate: {
//     //   validator: function (v) {
//     //     return /^\d+$/.test(v); // Check if the phone number contains only digits
//     //   },
//     //   message: (props) => `${props.value} is not a valid phone number!`,
//     // },
//   },
//   resumeLink: {
//     type: String,
//     required: true,
//   },
// });

// const Apply = mongoose.model('Apply', applySchema);

// module.exports = Apply;








// const mongoose = require('mongoose');

// const applySchema = new mongoose.Schema({
//   job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: false },
//   user: { type: String, required: false }, // Update 'required' to 'true' if user identifier is required
//   phone: { type: String, required: true }, // Update 'required' to 'true' if phone is required
//   resumeLink: { type: String, required: true },
// });

// const Apply = mongoose.model('Apply', applySchema);

// module.exports = Apply;










// const mongoose = require('mongoose');

// const applySchema = new mongoose.Schema({
//   job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: false },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
//   resumeLink: { type: String, required: true },
// });

// const Apply = mongoose.model('Apply', applySchema);

// module.exports = Apply;
