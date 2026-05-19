const nodemailer = require('nodemailer');

// Create transporter (configure based on your email service)
const createTransporter = () => {
    return nodemailer.createTransporter({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

exports.sendDonationConfirmation = async (donation) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log('Email not configured, skipping confirmation email');
            return;
        }

        const transporter = createTransporter();

        const mailOptions = {
            from: `"Qelec Team" <${process.env.EMAIL_USER}>`,
            to: donation.donorEmail,
            subject: 'Thank you for your sponsorship!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #0056b3;">Thank you for supporting Qelec!</h2>
                    <p>Dear ${donation.donorName},</p>
                    <p>We greatly appreciate your generous donation of <strong>GHS ${donation.amount}</strong> to support our mission.</p>
                    <p>Your contribution will help us:</p>
                    <ul>
                        <li>Provide STEM education to young Ghanaians</li>
                        <li>Develop innovative technology solutions</li>
                        <li>Support community projects across Ghana</li>
                    </ul>
                    <p><strong>Reference:</strong> ${donation.reference}</p>
                    <p><strong>Date:</strong> ${new Date(donation.createdAt).toLocaleDateString()}</p>
                    <br>
                    <p>Best regards,<br>The Qelec Team</p>
                    <hr>
                    <p style="color: #666; font-size: 12px;">
                        This is an automated message. Please do not reply to this email.
                    </p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Donation confirmation email sent to:', donation.donorEmail);

    } catch (error) {
        console.error('Error sending donation confirmation email:', error);
    }
};

exports.sendApplicationConfirmation = async (application) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log('Email not configured, skipping confirmation email');
            return;
        }

        const transporter = createTransporter();
        const email = application.applicationType === 'professional' ? application.email : application.parentEmail;

        const mailOptions = {
            from: `"Qelec Team" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Application Received - Qelec',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #0056b3;">Application Received</h2>
                    <p>Thank you for applying to Qelec!</p>
                    <p>We have received your ${application.applicationType} application and will review it carefully.</p>
                    <p><strong>Application Type:</strong> ${application.applicationType}</p>
                    <p><strong>Reference ID:</strong> ${application._id}</p>
                    <p><strong>Date:</strong> ${new Date(application.createdAt).toLocaleDateString()}</p>
                    <br>
                    <p>We will contact you within 3-5 business days regarding the next steps.</p>
                    <br>
                    <p>Best regards,<br>The Qelec Team</p>
                    <hr>
                    <p style="color: #666; font-size: 12px;">
                        This is an automated message. Please do not reply to this email.
                    </p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Application confirmation email sent to:', email);

    } catch (error) {
        console.error('Error sending application confirmation email:', error);
    }
};

exports.sendContactConfirmation = async (contact) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log('Email not configured, skipping confirmation email');
            return;
        }

        const transporter = createTransporter();

        const mailOptions = {
            from: `"Qelec Team" <${process.env.EMAIL_USER}>`,
            to: contact.email,
            subject: 'Message Received - Qelec',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #0056b3;">Message Received</h2>
                    <p>Dear ${contact.name},</p>
                    <p>Thank you for contacting Qelec. We have received your message and will get back to you shortly.</p>
                    <p><strong>Subject:</strong> ${contact.subject}</p>
                    <p><strong>Message:</strong> ${contact.message}</p>
                    <br>
                    <p>We typically respond within 24-48 hours.</p>
                    <br>
                    <p>Best regards,<br>The Qelec Team</p>
                    <hr>
                    <p style="color: #666; font-size: 12px;">
                        This is an automated message. Please do not reply to this email.
                    </p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Contact confirmation email sent to:', contact.email);

    } catch (error) {
        console.error('Error sending contact confirmation email:', error);
    }
};