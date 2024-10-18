const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');


const app = express();
app.use(express.json());


mongoose.connect('mongodb+srv://admin:Atlas.Password123@cluster0.6pxrd.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority&appName=Cluster0',);

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);


app.listen(8081, () => {
    console.log('Server is running on port 8081')});

