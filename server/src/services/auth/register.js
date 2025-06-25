const authModel = require("@models/auth");


async function register({name, email, password}){
	try{
		const doc = {
			name,
			email,
			password,
			role: "user",
			createdAt: Date.now(),
		};

		const result = await authModel.register({doc});

		return {
			success: true,
			code: 200,
			message: "User has been registered.",
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = register;
