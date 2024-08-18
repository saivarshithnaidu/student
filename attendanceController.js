// controllers/attendanceController.js
const Attendance = require('../models/Attendance');
const Student = require('../models/student');

// Mark attendance for a student
exports.markAttendance = async (req, res) => {
  const { rollNo, date, present } = req.body;

  try {
    const student = await Student.findOne({ rollNo });

    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    const attendance = new Attendance({
      student: student._id,
      date: new Date(date),
      present,
    });

    await attendance.save();

    res.status(201).json({ msg: 'Attendance marked successfully' });
  } catch (error) {
    // Handle unique index violation error (duplicate attendance for the same date)
    if (error.code === 11000) {
      return res.status(400).json({ msg: 'Attendance already marked for this date' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Get attendance for a student
exports.getAttendance = async (req, res) => {
  const { rollNo } = req.params;

  try {
    const student = await Student.findOne({ rollNo });

    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    const attendanceRecords = await Attendance.find({ student: student._id }).sort('date');

    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get attendance for all students in a section
exports.getSectionAttendance = async (req, res) => {
  const { branch, year } = req.params;

  try {
    const students = await Student.find({ branch, year });

    if (students.length === 0) {
      return res.status(404).json({ msg: 'No students found in this section' });
    }

    const attendanceData = await Attendance.find({
      student: { $in: students.map(s => s._id) },
    }).populate('student');

    res.status(200).json(attendanceData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
