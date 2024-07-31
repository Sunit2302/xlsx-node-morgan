const express = require('express');
const { createHod, getHod } = require('../controllers/hodController');

const hodrouter = express.Router();

hodrouter.post('/hod/create/:id', createHod);
// router.get('/hod/:hodName', getHODWithTeachers);
hodrouter.get('/hod/getAllData', getHod);

module.exports = hodrouter
