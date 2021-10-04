if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const checkInRouter = require('./routes/checkInRoute/checkIn');
const seedDB = require('./seedDB');
const checkOutRouter = require('./routes/checkOutRoute/checkOut')
const session = require('express-session');
const flash = require('connect-flash');

app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', (path.join(__dirname, 'views')));
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to Database checkIn');
        // seedDB();
    })
    .catch((err) => {
        console.log(err);
    })



const sessionConfig = {
    secret: 'ineedbettersecret',
    resave: false,
    saveUninitialized: true,
}

app.use(session(sessionConfig));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})




app.use(checkInRouter);
app.use(checkOutRouter);





app.get('/', (req, res) => {

    res.render('home')
})


app.listen(process.env.PORT || 3000, () => {
    console.log('Connected At port 3000');
})