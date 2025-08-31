const response = require("@utils/response");
const validator = require("validator");
const authService = require("@services/auth");


async function register(req, res, next){
	const errors = validatePayload(req.body);

	if(errors.length > 0) return response(res, {
		success: false,
		code: 400,
		errors,
	});


	try{
		const result = await authService.register({
			name: req.body.name,
			email: req.body.email,
			role: req.body.role,
			password: req.body.password,
		});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


function validatePayload(payload){
	const errors = [];
	const {name, email, password, role} = payload;


	if(!name) errors.push("Name is required.");
	if(!email) errors.push("E-Mail is required.");
	if(!password) errors.push("Password is required.");
	if(!role) errors.push("Role is required.");
	

	if(name && typeof name !== "string") errors.push("Name must be of type string.");
	if(role && typeof name !== "string") errors.push("Role must be of type string.");
	if(email && typeof email !== "string") errors.push("E-Mail must be of type string.");
	if(password && typeof password !== "string") errors.push("Password must be of type string.");
	
	if(typeof name === "string" && !validator.isLength(name, {min: 3, max: 20})){
		errors.push("'Name' must have at least 3 and at most 20 characters.");
	}
	if(typeof role === "string" && !validator.isLength(role, {min: 4, max: 4})){
		errors.push("'Role' must have 4 characters.");
	}
	if(typeof password === "string" && !validator.isLength(name, {min: 3, max: 20})){
		errors.push("'Password' must have at least 3 and at most 20 characters.");
	}
	if(typeof email === "string" && !validator.isEmail(email)){
		errors.push("No valid E-Mail.");
	}
	

	return errors;
}


module.exports = register;
