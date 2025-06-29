const Appointment = require('../models/Appointment');

// 📥 Patient books appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { patientName, patientEmail, doctorId, date, time, mode } = req.body;

    const appointment = new Appointment({
      patientName,
      patientEmail,
      doctorId,
      date,
      time,
      mode
    });

    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📤 Doctor views their appointments
exports.getAppointmentsByDoctor = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const appointments = await Appointment.find({ doctorId });
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📥 Patient views their own appointments
exports.getAppointmentsByPatient = async (req, res) => {
  try {
    const patientEmail = req.user.email;
    const appointments = await Appointment.find({ patientEmail });
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Doctor updates status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { status } = req.body;

    if (!['approved', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({ message: `Appointment ${status} successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ Doctor deletes appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const deleted = await Appointment.findByIdAndDelete(appointmentId);

    if (!deleted) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
