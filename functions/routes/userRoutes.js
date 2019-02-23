const admin = require('firebase-admin');
const express = require('express');
const request = require('request');
const jwt = require('jsonwebtoken');
const config = require('../config');

const isAuthenticated = require('../middlewares/auth');

// database reference
const db = admin.firestore();

const app = express.Router();

// constants
const googleUrl = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=';
let users = db.collection('users');


app.route('/login')
	.post(googleLogin);

























function googleLogin(req, res) {

	let token = req.body.id_token;
	if(token === undefined) {
		return res.status(400).json({		
			success: false,
			message: "Usage: [POST] id_token=token"
		});
	}

	request(googleUrl + token, { json: true }, (err, response, body) => {

		if(err) {														// error in request
			return res.status(406).json({
				success: false,
				message: "could not make request to google",
				err: err
			});
		}

		if(body.error_description !== undefined) {				// error in idToken
			return res.status(400).json({					// unauthenticated request
				message: "empty/invalid token",
				error: 'unauthenticated request',
				success: false,
			});
		}
	
		let sub = body.sub;									// user UID
		let name = body.name;								// user name
		let email = body.email;								// user email
		let picture = body.picture;							// picture url	
		
		users.doc(sub).get()
		.then((snapshot) => {
			
			// new user
			if(snapshot.exists === false) {
				let userData = {
					name,
					email,
					picture,
					sub
				}

				// add new user
				users.doc(sub).set(userData);

				const jwtToken = jwt.sign(userData, config.key);

				return res.status(200).json({
					success: true,
					message: 'New User Added',
					data: {
						token: jwtToken
					}
				});
			}
			else {
				let userData = snapshot.data();
				
				const jwtToken = jwt.sign(userData, config.key);

				return res.status(200).json({
					success: true,
					message: 'Old User',
					data: {
						token: jwtToken
					}
				});
			}
		})
		.catch((err) => {

			return res.status(500).json({
				success: false,
				message: 'Unexpected Error Occured.',
				error: err
			})
		})

	})

}


module.exports = app;