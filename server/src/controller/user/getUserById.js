const response = require("@utils/response");
const userService = require("@services/user");


async function getUserById(req, res, next){
	try{
		const result = await userService.getUserById({
			userId: req.query.userId
		});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = getUserById;
