const jwt = require('jsonwebtoken');
const config = require('../config');

const isAuthenticated = (req, res, next) => {

	const token = req.headers.authorization;

	if(token) {

		jwt.verify(token, config.key, (err, data) => {

			if(err) {
				return res.status(401).json({
		        	success: false, 
		        	err: 'unauthenticated request'
		        });
			}

			req.body.sub = data.sub;

			return next();
		})
	}
	else {

		return res.status(401).json({
			success: false,
			err: "unauthenticated request"
		});
	}
}


module.exports = isAuthenticated;