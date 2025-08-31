const response = require("@utils/response");


async function test(req, res, next){
	try{
		response(res, {
			success: true,
			code: 200,
			message: "Test endpoint is working!",
			data: {
				timestamp: new Date().toISOString(),
				status: "OK"
			}
		});
	}
	catch(error){
		next(error);
	}
}


module.exports = test; 