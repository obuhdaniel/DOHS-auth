const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

require('dotenv').config();

const medicalRegister = async (req, res) => {
    const {firstname, lastname, email, role, licenseNumber, password, location } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ firstname, lastname, email, role, licenseNumber, password: hashedPassword, location });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
};

const medicalLogin = async (req, res) => {
    const { licenseNumber, password } = req.body;

    try {
        console.log(`Login attempt for email: ${email}`);

        const user = await User.findOne({ where: { licenseNumber } });

        if (!user) {
            console.log('User not found');
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log('Invalid password');
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id, licenseNumber:user.licenseNumber, firstname:user.firstname, lastname:user.lastname, location:user.location,  role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
        if(!token){
            console.log('no token');
            return res.status(403).json({error: 'token error' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Failed to log in user' });
    }
};




module.exports = { medicalLogin, medicalRegister };
