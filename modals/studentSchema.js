let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const student = mongoose.model('students', new Schema({
    first_name: { type: String, unique: false },
    last_name: { type: String, unique: false },
    email: { type: String, unique: true },
    password: { type: String, unique: false },
    phone_number: { type: String, unique: false }
}));

module.exports = student;