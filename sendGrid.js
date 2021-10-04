const sgMail = require('@sendgrid/mail');
const API_KEY = process.env.SEND_GRID_API_KEY;
sgMail.setApiKey(API_KEY)

// name,email,time,msg
function sendEmail(email, sub, msg) {


    const message = {

        to: email,
        from: {
            name: 'CheckIn',
            email: 'karan0451.cse19@chitkara.edu.in'
        },
        subject: sub,
        text: msg,
        html: `<h1>${msg}</h1>`

    }

    sgMail.send(message)
        .then(res => console.log('Email Sent'))
        .catch((err) => console.log(err));



}

module.exports = sendEmail;