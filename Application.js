const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    // Common fields
    applicationType: {
        type: String,
        enum: ['professional', 'stem'],
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    
    // Professional application fields
    desiredPosition: String,
    skills: String,
    education: String,
    motivation: String,
    resumeUrl: String,
    
    // STEM application fields
    studentName: String,
    studentAge: Number,
    parentEmail: String,
    parentPhone: String,
    school: String,
    grade: String,
    stemInterest: String,
    experience: String,
    goals: String,
    emergencyContact: String,
    
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'contacted', 'rejected', 'accepted'],
        default: 'pending'
    },
    notes: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Application', applicationSchema);