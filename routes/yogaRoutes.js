const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  bookYogaClass,
  getClassesByInstructor,
  updateClassStatus,
  deleteYogaClass
} = require('../controllers/yogaClassController');

const User = require('../models/User'); // ✅ instructor fetch करने के लिए

// 📥 Learner registers
router.post('/yoga/book', bookYogaClass);

// 📤 Instructor views learners
router.get('/yoga/classes', auth, getClassesByInstructor);

// ✅ PATCH to approve/cancel
router.patch('/yoga/classes/:id/status', auth, updateClassStatus);

// ❌ DELETE learner class
router.delete('/yoga/classes/:id', auth, deleteYogaClass);

// 🆕 GET list of yoga instructors
router.get('/instructors', async (req, res) => {
  try {
    const instructors = await User.find({ role: 'instructor' }, 'name email');
    res.status(200).json(instructors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
