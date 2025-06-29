const YogaClass = require('../models/YogaClass');

// 📥 Learner books class
exports.bookYogaClass = async (req, res) => {
  try {
    const { learnerName, learnerEmail, instructorId, date, time, mode } = req.body;

    const newClass = new YogaClass({
      learnerName,
      learnerEmail,
      instructorId,
      date,
      time,
      mode
    });

    await newClass.save();
    res.status(201).json({ message: "Yoga class booked successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📤 Instructor views all learners
exports.getClassesByInstructor = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const classes = await YogaClass.find({ instructorId });
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Instructor updates status
exports.updateClassStatus = async (req, res) => {
  try {
    const classId = req.params.id;
    const { status } = req.body;

    if (!['approved', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const yogaClass = await YogaClass.findById(classId);

    if (!yogaClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    yogaClass.status = status;
    await yogaClass.save();

    res.status(200).json({ message: `Yoga class ${status} successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ Instructor deletes learner class
exports.deleteYogaClass = async (req, res) => {
  try {
    const classId = req.params.id;

    const deleted = await YogaClass.findByIdAndDelete(classId);

    if (!deleted) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({ message: "Yoga class deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
