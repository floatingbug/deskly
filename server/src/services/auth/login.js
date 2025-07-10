const authModel = require("@models/auth");
const jwt = require("jsonwebtoken");


async function login({nameOrEmail, password}){
	let user = null;

	// get user
	try{
		const query = {
			$or: [
				{
					name: nameOrEmail,
					password: password,
				},
				{
					email: nameOrEmail,
					password: password,
				},
			],
		};

		user = await authModel.login({query});

		if(!user){
			return{
				success: false,
				code: 400,
				errors: ["Name, E-Mail or Password is incorrect."],
			};
		}
	}
	catch(error){
		throw error;
	}

	// create token
	try{
		const token = await new Promise((resolve, reject) => {
			jwt.sign(user, process.env.JWT_SECRET, (error, token) => {
				if(error) reject(error);
				else resolve(token);
			});
		});

		return {
			success: true,
			code: 200,
			message: "Sent token.",
			data: {
				user: {
					name: user.name,
					role: user.role,
					jwt: token,
				}
			}
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = login;
