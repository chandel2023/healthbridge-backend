const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

// Protected route example
router.get('/dashboard', auth, (req, res) => {
  const { role, id } = req.user;

  if (role === "doctor") {
    return res.json({ message: `Doctor's dashboard for ID: ${id}` });
  } else if (role === "learner") {
    return res.json({ message: `Yoga learner dashboard for ID: ${id}` });
  } else if (role === "patient") {
    return res.json({ message: `Patient dashboard for ID: ${id}` });
  } else {
    return res.status(403).json({ message: "Unauthorized role" });
  }
});

module.exports = router;
