// backend/app.js or backend/index.js

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const { initDB } = require('./models');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes); // Include dashboard routes

initDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
