const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);



// Due to trial Version of twilio, sms is sent to verified number only 
// Screenshot of sms to verified is added in Github Repo

function sendTextMessage(msg, number) {

    client.messages
        .create({
            body: msg,
            from: '+12182454082',
            to: number
        })
        .then(message => console.log(message.sid))
        .catch((err) => console.log(err));

}

module.exports = sendTextMessage;