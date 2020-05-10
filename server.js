let express = require('express');
let app = module.exports =  express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

const studentRoutes = require('./routes/studentRoutes');
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

app.use('/api', studentRoutes);

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});