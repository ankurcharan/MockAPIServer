const admin = require('firebase-admin');
const express = require('express');
const request = require('request');
const jwt = require('jsonwebtoken');
const config = require('../config');

const isAuthenticated = require('../middlewares/auth');

// database reference
const db = admin.firestore();
let users = db.collection('users');

const app = express.Router();


app.use('/:sub/:projectName', serveMockAPI);

function serveMockAPI(req, res) {



	let key = req.method + req.url;
	key = desiredUrl(key);

	let sub = req.params.sub;
	let projectName = req.params.projectName;

	console.log(sub, projectName, key);

	users.doc(sub).collection(projectName).doc(key).get()
	.then((snapshot) => {
		if(!snapshot.exists) {
			
			return res.status(406).json({
				success: false,
				message: 'no such api. check url again'
			})
		}

		let data = snapshot.data();

		if(data.headers) {
			res.set(data.headers);
		}

		return res.status(200).send(data.apiresponse);
	})
	.catch((err) => {

		return res.status(500).json({
			success: false,
			message: 'unexpected error occured.',
			error: err
		})
	})

}


function desiredUrl(x) {
	x = x.toLowerCase();
	x = x.replace(/[/]/g, "#");
	return x;
}


module.exports = app;