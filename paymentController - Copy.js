const Donation = require('../models/Donation');
const paystackService = require('../utils/paystack');
const { sendDonationConfirmation } = require('./emailController');

exports.initializePayment = async (req, res) => {
    try {
        const { amount, email, name, sponsorshipLevel, message } = req.body;
        
        // Validate input
        if (!amount || !email || !name) {
            return res.status(400).json({
                success: false,
                message: 'Amount, email, and name are required'
            });
        }

        if (amount < 10) {
            return res.status(400).json({
                success: false,
                message: 'Minimum donation amount is GHS 10'
            });
        }

        // Generate unique reference
        const reference = `QELEC_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Create donation record
        const donation = new Donation({
            reference,
            amount,
            donorEmail: email,
            donorName: name,
            sponsorshipLevel: sponsorshipLevel || 'custom',
            message
        });

        await donation.save();

        // Initialize Paystack payment
        const paymentData = await paystackService.initializeTransaction(
            email,
            amount,
            reference,
            {
                custom_fields: [
                    {
                        display_name: "Donor Name",
                        variable_name: "donor_name",
                        value: name
                    },
                    {
                        display_name: "Sponsorship Level",
                        variable_name: "sponsorship_level",
                        value: sponsorshipLevel || 'custom'
                    }
                ]
            }
        );

        res.json({
            success: true,
            message: 'Payment initialized successfully',
            data: {
                authorization_url: paymentData.data.authorization_url,
                access_code: paymentData.data.access_code,
                reference: paymentData.data.reference
            }
        });

    } catch (error) {
        console.error('Payment initialization error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const { reference } = req.body;

        if (!reference) {
            return res.status(400).json({
                success: false,
                message: 'Reference is required'
            });
        }

        // Verify payment with Paystack
        const verification = await paystackService.verifyTransaction(reference);

        if (verification.data.status === 'success') {
            // Update donation record
            const donation = await Donation.findOneAndUpdate(
                { reference },
                { 
                    status: 'success',
                    paystackData: verification.data
                },
                { new: true }
            );

            if (donation) {
                // Send confirmation email
                await sendDonationConfirmation(donation);
                
                res.json({
                    success: true,
                    message: 'Payment verified successfully',
                    data: donation
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Donation record not found'
                });
            }
        } else {
            // Payment failed
            await Donation.findOneAndUpdate(
                { reference },
                { status: 'failed' }
            );

            res.status(400).json({
                success: false,
                message: 'Payment verification failed',
                data: verification.data
            });
        }

    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.getDonations = async (req, res) => {
    try {
        const { page = 1, limit = 10, status } = req.query;
        const skip = (page - 1) * limit;

        let query = {};
        if (status) {
            query.status = status;
        }

        const donations = await Donation.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Donation.countDocuments(query);

        res.json({
            success: true,
            data: {
                donations,
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('Get donations error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};