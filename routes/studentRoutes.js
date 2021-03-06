let express = require('express');
let studentRoutes =  express();
let studentEvents = require('../controllers/studentController');

studentRoutes.route('/students')
            .get(studentEvents.getStudents)
            .post(studentEvents.saveStudent)
            
studentRoutes.route('/student/:email')
            .get(studentEvents.getStudentByEmail)
            .put(studentEvents.updateStudent)
            .delete(studentEvents.deleteStudent)

module.exports = studentRoutes;
            
