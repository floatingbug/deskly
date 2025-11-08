const jwt = require("jsonwebtoken");


async function getUserByJwt({token}){
	try{
		const decodedUser = await new Promise((resolve, reject) => {
			jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
				if(error) reject(error);
				else resolve(decoded);
			})
		});

		let {iat, password, ...user} = decodedUser;
		user.jwt = token;

		return {
			success: true,
			code: 200,
			message: "Sent user.",
			data: {
				user,
			}
		}
	}
	catch(error){
		throw error;
	}
}


module.exports = getUserByJwt;
