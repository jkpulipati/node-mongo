let MongoClient = require('mongodb').MongoClient;
const nodemailer = require('nodemailer');
let connection;

function sendEmail(email, text) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jaya.pulipati@gmail.com',
            pass: '****'
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


function initializeDBConnection() {
    return new Promise( (resolve, reject) => {
        if (resolve) {
            MongoClient.connect('mongodb://jk:jk@ds151820.mlab.com:51820/ams', function (err, db) {
                if (err) throw err;
                connection = db;
                resolve(connection);
            });
        }
        
    })
    
}

module.exports = {
    sendEmail: sendEmail,
    initializeDBConnection: initializeDBConnection
}
