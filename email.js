// Initialize EmailJS
emailjs.init('YzTf23I8ask8Hesuz');

const sendEmail = async (name, email, subject, message) => {
    try {
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_email: 'vijeshmperumbala31@gmail.com'  // Replace with your email address
        };

        const response = await emailjs.send(
            'service_1gyx9mn',
            'template_z6z2zr8',
            templateParams
        );

        if (response.status === 200) {
            return { success: true, message: 'Email sent successfully!' };
        } else {
            throw new Error('Failed to send email');
        }
    } catch (error) {
        console.error('Email sending error:', error);
        return { success: false, message: error.message };
    }
};


