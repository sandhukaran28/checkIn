const express = require('express');
const Person = require('../../models/person');
const sendGrid = require('../../sendGrid');
const twilio = require('../../twilio');

const router = express.Router();

router.get('/checkout', (req, res) => {

    res.render('checkOutPage')
})


router.post('/checkOutPerson', async (req, res) => {


    await addToDb(req.body, req);


    res.redirect('/');
})


async function addToDb(newCheckOut, req) {

    const res = await Person.findOne({
        mobile: newCheckOut.mobile
    });

    if (res == null) {
        req.flash('error', 'You need to first checkIn before checkOut');

    } else {

        if (res.currentState[res.currentState.length - 1].checkIn == false) {

            req.flash('error', 'You need to first checkIn before checkOut');

        } else {

            try {
                await Person.updateOne({
                        mobile: newCheckOut.mobile
                    }, {
                        $push: {
                            currentState: {
                                checkIn: false,
                            }
                        }
                    },

                );
                let personEntry = await Person.findOne({
                    mobile: newCheckOut.mobile
                });
                const msg = `Hi ${personEntry.name}, you just checkedOut from office on ${personEntry.currentState[personEntry.currentState.length - 1].time}.`
                sendGrid(personEntry.email, 'You just CheckedOut', msg);
                twilio(msg, '+91' + personEntry.mobile);
                req.flash('success', 'Check out Successfull');
            } catch (e) {
                req.flash('error', 'Oops Something went wrong');
            }
        }



    }


}










module.exports = router;