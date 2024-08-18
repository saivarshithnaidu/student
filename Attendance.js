// models/Attendance.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  present: {
    type: Boolean,
    required: true,
  },
});

attendanceSchema.index({ student: 1, date: 1 }, { unique: true }); // Ensures unique attendance records for each student per date

module.exports = mongoose.model('Attendance', attendanceSchema);
