const jwt = require("jsonwebtoken");
const response = require("@utils/response");


async function authUser(req, res, next){
	try{
		const token = req.headers["authorization"];

		if(!token){
			return response(res, {
				success: false,
				code: 400,
				errors: ["No token provided. Please sign out and sign in again."],
			});
		}

		const user = await new Promise((resolve, reject) => {
			jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
				if(error) reject(error);
				else resolve(decoded);
			});
		});

		req.user = user;
		next();
	}
	catch(error){
		console.log(error);

		response(res, {
			success: false,
			code: 400,
			errors: ["Invalid token. Please sign out and sign in again."],
		});
	}
}


module.exports = authUser;
