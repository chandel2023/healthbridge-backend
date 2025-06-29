const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  bookAppointment,
  getAppointmentsByDoctor,
  getAppointmentsByPatient,
  updateAppointmentStatus,
  deleteAppointment
} = require('../controllers/appointmentController');

// 📥 Book appointment (Patient)
router.post('/appointments', bookAppointment);

// 📤 View appointments (Doctor)
router.get('/appointments', auth, getAppointmentsByDoctor);

// 📥 View appointments (Patient)
router.get('/appointments/patient', auth, getAppointmentsByPatient);

// ✅ PATCH status (Doctor)
router.patch('/appointments/:id/status', auth, updateAppointmentStatus);

// ❌ DELETE appointment
router.delete('/appointments/:id', auth, deleteAppointment);

module.exports = router;
