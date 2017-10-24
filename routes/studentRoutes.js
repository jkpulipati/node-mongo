let express = require('express');
let studentRoutes =  express();
let studentEvents = require('../controllers/studentController');

studentRoutes.route('/students')
            .get(studentEvents.getStudents)
            .post(studentEvents.saveStudent)
            
studentRoutes.route('/student/:email')
            .get()
            .put(studentEvents.updateStudent)
            .delete()

module.exports = studentRoutes;
            
