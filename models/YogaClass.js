const mongoose = require('mongoose');

const yogaClassSchema = new mongoose.Schema({
    learnerName: { type: String, required: true },
    learnerEmail: { type: String, required: true },
    instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    mode: { type: String, enum: ['online', 'offline'], required: true },
    status: { type: String, enum: ['pending', 'approved', 'cancelled'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('YogaClass', yogaClassSchema);
