const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    port: 2525,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const SendMail = (type, to, url) => {
    const mailOptions = {
        from: 'team@nomadworld.ai',
        to: to,
        subject:  type === 'activate' ? 'activate Your Email' : 'Reset Password',
        html: `${ 
            type === 'activate' ? 
            `<div>
                <h1>activate Your Email</h1>
                <p>please click on this link to activate your email: <a href='${url}'>click here</a></p>
            </div>` :

            `<div>
                <h1>Reset your password</h1>
                <p>please click on this link to reset your password: <a href='${url}'>click here</a></p>
            </div>`
        }`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports = SendMail