const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    reference: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'GHS'
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
    },
    donorEmail: {
        type: String,
        required: true
    },
    donorName: {
        type: String,
        required: true
    },
    sponsorshipLevel: {
        type: String,
        enum: ['supporter', 'innovator', 'visionary', 'custom'],
        default: 'custom'
    },
    message: {
        type: String,
        maxlength: 500
    },
    paystackData: {
        type: Object,
        default: {}
    }
}, {
    timestamps: true
});

// Index for faster queries
donationSchema.index({ reference: 1 });
donationSchema.index({ status: 1 });
donationSchema.index({ createdAt: 1 });

module.exports = mongoose.model('Donation', donationSchema);