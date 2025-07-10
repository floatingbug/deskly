const response = require("@utils/response");
const userService = require("@services/user");


async function getUserByJwt(req, res, next){
	try{
		const token = req.headers["authorization"];
		const result = await userService.getUserByJwt({token});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = getUserByJwt;
