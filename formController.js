const Application = require('../models/Application');
const { sendApplicationConfirmation } = require('./emailController');

exports.submitApplication = async (req, res) => {
    try {
        const { applicationType, ...applicationData } = req.body;

        if (!applicationType || !['professional', 'stem'].includes(applicationType)) {
            return res.status(400).json({
                success: false,
                message: 'Valid application type is required'
            });
        }

        // Validate required fields based on application type
        if (applicationType === 'professional') {
            const required = ['fullName', 'email', 'phone', 'skills', 'education', 'motivation'];
            const missing = required.filter(field => !applicationData[field]);
            
            if (missing.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: `Missing required fields: ${missing.join(', ')}`
                });
            }
        } else if (applicationType === 'stem') {
            const required = ['studentName', 'studentAge', 'parentEmail', 'parentPhone', 'school', 'grade', 'goals'];
            const missing = required.filter(field => !applicationData[field]);
            
            if (missing.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: `Missing required fields: ${missing.join(', ')}`
                });
            }
        }

        // Create application
        const application = new Application({
            applicationType,
            ...applicationData
        });

        await application.save();

        // Send confirmation email
        await sendApplicationConfirmation(application);

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully',
            data: application
        });

    } catch (error) {
        console.error('Application submission error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.getApplications = async (req, res) => {
    try {
        const { page = 1, limit = 10, type, status } = req.query;
        const skip = (page - 1) * limit;

        let query = {};
        if (type) query.applicationType = type;
        if (status) query.status = status;

        const applications = await Application.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Application.countDocuments(query);

        res.json({
            success: true,
            data: {
                applications,
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('Get applications error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, notes } = req.body;

        const application = await Application.findByIdAndUpdate(
            id,
            { status, notes },
            { new: true }
        );

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        res.json({
            success: true,
            message: 'Application status updated',
            data: application
        });

    } catch (error) {
        console.error('Update application error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};