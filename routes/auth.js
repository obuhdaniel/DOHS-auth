const express = require('express');
const { register, login } = require('../controllers/authController');
const { medicalRegister, medicalLogin } = require('../controllers/medicalAuthController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post('/medicalRegister', medicalRegister);

router.post('/medicalLogin', medicalLogin);

module.exports = router;
