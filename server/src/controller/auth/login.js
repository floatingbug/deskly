const authService = require("@services/auth");
const response = require("@utils/response");
const validator = require("validator");


async function login(req, res, next){
	try{
		const result = await authService.login(req.body);

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = login;
