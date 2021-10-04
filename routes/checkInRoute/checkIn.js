const express = require('express');
const router = express.Router();
const Person = require('../../models/person');
const sendGrid = require('../../sendGrid');
const twilio = require('../../twilio');


router.get('/checkIn', (req, res) => {

    res.render('checkInPage');
})


router.post('/checkInPerson', async (req, res) => {

    await addtoDb(req.body, req);
    res.redirect('/');
});

async function addtoDb(newCheckIn, req) {
    const res = await Person.findOne({
        mobile: newCheckIn.mobile
    });

    if (res == null) {

        try {
            let personEntry = new Person({
                name: newCheckIn.name,
                email: newCheckIn.email,
                mobile: newCheckIn.mobile,
                currentState: [{
                    checkIn: true
                }]
            });

            personEntry.save(async function (err, result) {
                if (err) {
                    req.flash('error', 'Oops Something went wrong');
                } else {
                    const msg = `Hi ${newCheckIn.name}, you just checkedin at office on ${personEntry.currentState[personEntry.currentState.length - 1].time}.`
                    await twilio(msg, '+91' + personEntry.mobile);
                    await sendGrid(newCheckIn.email, 'You just CheckedIn', msg);
                }

            })
            req.flash('success', 'Check in succesfull');
        } catch (e) {
            req.flash('error', 'Oops Something went wrong');
        }


    } else {

        // Checking if person already checked in and not checked out
        if (res.currentState[res.currentState.length - 1].checkIn == true) {

            req.flash('error', 'You already checked in.');
        } else {

            try {

                const res = await Person.updateOne({
                        mobile: newCheckIn.mobile
                    }, {
                        $push: {
                            currentState: {
                                checkIn: true,
                            }
                        }
                    },

                );

                let personEntry = await Person.findOne({
                    mobile: newCheckIn.mobile
                });
                const msg = `Hi ${newCheckIn.name}, you just checkedin at office on ${personEntry.currentState[personEntry.currentState.length - 1].time}.`
                sendGrid(newCheckIn.email, 'You just CheckedIn', msg);

                twilio(msg, '+91' + personEntry.mobile);
                req.flash('success', 'Check in succesfull');
            } catch (e) {
                req.flash('error', 'Oops Something went wrong');
            }

        }

    }



}







module.exports = router;