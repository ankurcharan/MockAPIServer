const admin = require('firebase-admin');
const express = require('express');

// database reference
const db = admin.firestore();

const app = express.Router();

// auth
const isAuthenticated = require('../middlewares/auth');


// constants
let users = db.collection('users');

app.use(isAuthenticated);
app.route('/')
	.post(addMockAPI)
	.get(fetchMockAPIS);


function fetchMockAPIS(req, res) {

	let sub = req.body.sub;
	let projectName = req.query.projectName;

	let serveUrl = sub + '/' + projectName

	if(!projectName || projectName.trim().length === 0) {
		return res.status(400).json({
			success: false,
			message: 'Usage [GET] projectName=projectName'
		})
	}

	users.doc(sub).collection(projectName).get()
	.then((snapshot) => {
		
		let data = {
			apis: []
		} 

		data.serveUrl = serveUrl;
		if(snapshot.empty) {
		
			return res.status(200).json({
				success: true,
				data: data
			});
		}

		snapshot.forEach((doc) => {
			data.apis.push(doc.data());
		})

		

		return res.status(200).json({
			success: true,
			data: data,
		});
	})
	.catch((err) => {

		return res.status(500).json({
			success: false,
			message: 'unexpected error occured',
			error: err
		})
	})
	return true;
}



function addMockAPI(req, res) {

	let sub = req.body.sub;
	let projectName = req.body.projectName;

	let endpoint = req.body.endpoint;
	let reqmethod = req.body.reqmethod;
	let type = req.body.type;
	let apiresponse = req.body.apiresponse;
	let headers = req.body.resheaders;

	if(!projectName || !endpoint || !apiresponse || !reqmethod || !type) {
		return res.status(400).json({
			success: false,
			message: 'Usage [POST] projectName=projectName & type=type & endpoint=endpoint & apiresponse=apiresponse & reqmethod=reqmethod & headers=headers',
		});
	}
	type = type.toLowerCase();

	if(endpoint[0] !== '/') {
		endpoint = '/' + endpoint;
	}

	let endpointUID = reqmethod + endpoint;
	endpointUID = desiredUrl(endpointUID);

	let apiData = {
		endpoint,
		apiresponse,
		reqmethod,
		type,
	}

	if(headers) {
		apiData.headers = headers;
	}

	users.doc(sub).collection(projectName).doc(endpointUID).set(apiData)
	.then(() => {

		return res.status(200).json({
			success: true,
			message: 'api added',
		});
	})
	.catch((err) => {
		return res.status(500).json({
			success: false,
			message: 'unexpected error occured',
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