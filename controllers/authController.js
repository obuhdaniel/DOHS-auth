const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

require('dotenv').config();

const register = async (req, res) => {
    const { email, username, role, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, username, role, password: hashedPassword });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log(`Login attempt for email: ${email}`);

        const user = await User.findOne({ where: { email } });

        if (!user) {
            console.log('User not found');
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log('Invalid password');
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
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


module.exports = { register, login };
