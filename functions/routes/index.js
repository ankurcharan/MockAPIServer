const admin = require('firebase-admin');
const express = require('express');

// database reference
const db = admin.firestore();

const app = express.Router();


const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const apiRoutes = require('./apiRoutes');
const servingApiRoutes = require('./serveApiRoutes');

app.use('/user', userRoutes);
app.use('/project', projectRoutes);
app.use('/mockapi', apiRoutes);
app.use('/serve', servingApiRoutes);




module.exports = app;