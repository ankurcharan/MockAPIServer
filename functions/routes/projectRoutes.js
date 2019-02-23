const admin = require('firebase-admin');
const express = require('express');
const request = require('request');
const jwt = require('jsonwebtoken');
const config = require('../config');

// database reference
const db = admin.firestore();

const app = express.Router();


// auth
const isAuthenticated = require('../middlewares/auth');


// constants
let users = db.collection('users');


app.use(isAuthenticated);
app.route('/')
	.put(addProject)
	.get(getProjects);


function getProjects(req, res) {

	let sub = req.body.sub;

	users.doc(sub).get()
	.then((snapshot) => {

		if(!snapshot.exists) {
			return res.status(404).json({
				success: false,
				message: 'user not found'
			});
		}

		let data = {
			projects: snapshot.data().projects
		};

		return res.status(200).json({
			success: true,
			message: 'user porojects recieved',
			data: data
		})
	})
	.catch((err) => {
		return res.status(500).json({
			success: false,
			message: 'unexpected error occured',
			error: err
		})
	})
}




function addProject(req, res) {

	console.log(req.body);

	let projectName = req.body.projectName;
	if(!projectName) {
		return res.status(400).json({
			success: false,
			message: 'Usage: [POST] projectName=ProjectName'
		});
	}

	let sub = req.body.sub;
	users.doc(sub).get()
	.then((snapshot) => {

		if(snapshot.exists === false) {
			return res.status(403).json({				// forbidden
				success: false,
				message: "user does not exist"
			});
		}

		let userData = snapshot.data();

		let projects = [];

		if(userData.projects === undefined) {
			projects.push(projectName);
		} else {
			projects = userData.projects;

			if(projects.indexOf(projectName) !== -1) {
				return res.status(406).json({
					success: false,
					message: "Project with same name exists"
				});
			}
			projects.push(projectName);
		}

		users.doc(sub).update({
			projects: projects
		});

		return res.status(200).json({				// send resposnse to client
			success: true,
			message: "project added",
		})
	})
	.catch((err) => {
		return res.status(500).json({							// not allowed
			success: false,
			message: "unexpected error occured",
			error: err
		})
	})
}





module.exports = app;