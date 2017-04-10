let MongoClient = require('mongodb').MongoClient;
let express = require('express');
let app = module.exports =  express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const nodemailer = require('nodemailer');
let connection;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

MongoClient.connect('mongodb://jk:jk@ds151820.mlab.com:51820/ams', function (err, db) {
    if (err) throw err;
    connection = db;
});


let sendEmail = function (email, text) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jaya.pulipati@gmail.com',
            pass: '******'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'jaya.pulipati@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'Ionic ✔', // Subject line
        text: text, // plain text body
        html: '<b>'+ text +'</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
};


app.get('/students', function (req, res) {
    connection.collection('students').find().toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});


let students = mongoose.model('students', new Schema({
    first_name: { type: String, unique: false },
    last_name: { type: String, unique: false },
    email: { type: String, unique: true },
    password: { type: String, unique: false },
    phone_number: { type: String, unique: false }
}));


app.post('/students', function (req, res) {
    let user = new students({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        phone_number: req.body.phone_number
    });
    connection.collection('students').insertOne(user, function(err, response) {
        if (err) throw err;
        console.log("Successfully Registered Congratualations.");
        sendEmail(req.body.email, 'You have Registered Successfully in ionic sample practice application ');
        res.json({
            status: 200,
            message: 'Successfully Registered Congratualations.'
        });

    });
});

app.put('/students', function (req, res) {
    connection.collection('students').replaceOne({email: req.body.email}, {$set: req.body}, function(err, response) {
        if (err) throw err;
        console.log("Successfully Updated Congratualations.");
        sendEmail(req.body.email, 'You have updated your information Successfully in ionic sample practice application ');
        res.json({
            status: 200,
            message: 'Successfully Updated Congratualations.'
        });
    });
});

app.delete('/students', function (req, res) {
    connection.collection('students').deleteOne({email: req.body.email}, function(err, response) {
        if (err) throw err;
        console.log("Successfully Deleted Congratualations.");
        sendEmail(req.body.email, 'You are De-activated Successfully in ionic sample practice application ');
        res.json({
            status: 200,
            message: 'Successfully Deleted Congratualations.'
        });
    });
});

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});