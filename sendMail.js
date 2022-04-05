/**
 * Title: mail sender
 * Descriptions: send mail of contact message of user to admin
 * Author: Moidul Hasan Khan
 * Date: 02/04/2022
 */

// Dependencies
require('dotenv').config();
const nodeMailer = require('nodemailer');


// Module Scafolding
const handler = {};


// configure smtp
handler.smtpConfig = () => {
    const config = {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SSL,
        auth: {
            user: process.env.SMTP_USER_ADMIN,
            pass: process.env.SMTP_USER_ADMIN_PASS,
        }
    }
    return config;
};


// Create mail options
handler.mailOptions = (message, name) => {
    const mailObj = {
        from: `"Kajkam Initiative System" <${process.env.SMTP_USER_ADMIN}>`,
        to: 'antu.khan.988@gmail.com, hasanjab14@gmail.com, najim7304@gmail.com, shaminur702@gmail.com',
        subject: `You got a new message from ${name}`,
        html: message,
    }
    return mailObj;
};


handler.mailSender = (emailProperty) => {
    const transporter = nodeMailer.createTransport(handler.smtpConfig());

    return transporter.sendMail(emailProperty, (error, info) => {
        if (error) {
            console.log(error);
            return false;
        } else {
            console.log('Email sent: ' + info.response);
            return true;
        }
    });
};

handler.sendMail = async(messageProperty) => {
    const emailBody = `
        <h3>Name: ${messageProperty.name}</h3>
        <h3>Subject: ${messageProperty.subject}</h3>
        <h3>email: ${messageProperty.email}</h3>
        <h3>category: ${messageProperty.category}</h3>
        <p>Message: ${messageProperty.message}</p>
    `;

    const emailObj = handler.mailOptions(emailBody, messageProperty.name);

    const isMailSended = handler.mailSender(emailObj);
    // handler.mailSender(emailObj).then(res => {
    //     console.log("res " + res);
    // })
    // const isMailSended = true;
    console.log(isMailSended);
    return isMailSended;
};


// export module
module.exports = handler;