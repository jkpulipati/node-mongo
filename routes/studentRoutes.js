let express = require('express');
let studentRoutes =  express();
let studentEvents = require('../controllers/studentController');

studentRoutes.route('/students')
            .get(studentEvents.getStudents)
            .post(studentEvents.saveStudent)

module.exports = studentRoutes;
            
