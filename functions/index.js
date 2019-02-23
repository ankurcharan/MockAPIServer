const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const config = require('./config');

// initialise default app
admin.initializeApp(functions.config().firebase);

// database reference
const db = admin.firestore();
db.settings({});



// create app
const app = express();

// routes
const routes = require('./routes');

//cors
app.use(cors({
	origin: true
}))

// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());






app.use('/', routes);


// EXPORT functions
exports.api = functions.https.onRequest(app);