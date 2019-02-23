const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');

// initialise default app
admin.initializeApp(functions.config().firebase);

// database reference
const db = admin.firestore();
db.settings({timestampsInSnapshots:true});

// create app
const app = express();

// routes
const routes = require('routes');

// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());








app.use('/', routes);


// EXPORT functions
exports.api = functions.https.onRequest(app);