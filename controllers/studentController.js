const connectionPool = require('./sharedController');
const studentModal = require('../modals/studentSchema');
const sharedCtrl = require('../controllers/sharedController');
let db;

function getStudents(req, res) {
    connectionPool.initializeDBConnection().then((response) => {
        db = response;
        db.collection('students').find().toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
    })
    .catch((err) => err);
}

function saveStudent(req, res) {
    let user = new studentModal({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        phone_number: req.body.phone_number
    });
    connectionPool.initializeDBConnection().then((response) => {
        db = response;
        db.collection('students').insertOne(user, function(err, response) {
            if (err) throw err;
            console.log("Successfully Registered Congratualations.");
            sharedCtrl.sendEmail(req.body.email, 'You have Registered Successfully in ionic sample practice application ');
            res.json({
                status: 200,
                message: 'Successfully Registered Congratualations.'
            });
            db.close();
        });
    })
    .catch((err) => err);

    
}

module.exports = {
    getStudents: getStudents,
    saveStudent: saveStudent
}