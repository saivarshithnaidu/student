// routes/attendanceRoutes.js
const express = require('express');
const { markAttendance, getAttendance, getSectionAttendance } = require('../controllers/attendanceController');
const router = express.Router();

// Route to mark attendance
router.post('/mark', markAttendance);

// Route to get attendance for a specific student
router.get('/:rollNo', getAttendance);

// Route to get attendance for a section (branch + year)
router.get('/section/:branch/:year', getSectionAttendance);

module.exports = router;
