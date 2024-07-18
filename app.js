// backend/app.js or backend/index.js

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
// const dashboardRoutes = require('./routes/dashboard');
const { initDB } = require('./models');
const path = require('path');




const app = express();
const port = process.env.PORT || 3000;



app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});
app.get('/auth/v1/west-benin/login', (req, res)=> {
    res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
});
app.get('/auth/v1/east-benin/register', (req, res)=> {
    res.sendFile(path.join(__dirname, 'frontend', 'register.html'));
});

app.get('/dashboard', (req,res)=>{
    res.sendFile(path.join(__dirname, 'frontend', 'dashboard.html'))
});
app.get('/view-dashboard/confirm-role/role=medical/access-granted', (req,res)=>{
    res.sendFile(path.join(__dirname, 'frontend', 'dashboard2.html'))
})





// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());
app.use('/auth', authRoutes);
// app.use('/dashboard', dashboardRoutes); // Include dashboard routes

initDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
