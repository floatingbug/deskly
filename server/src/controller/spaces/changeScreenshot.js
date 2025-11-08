const response = require("@utils/response");
const spacesService = require("@services/spaces");


async function changeScreenshot(req, res, next){
	let errors = [];

	// validate
	errors = validatePayload({file: req.file});

	if(errors.length > 0){
		return response(res, {
			success: false,
			code: 404,
			errors,
		});
	}

	try{
		const result = await spacesService.changeScreenshot({
			image: req.file,
			imageName: req.body.imageName,
		});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


function validatePayload({file}){
	let errors = [];

	if(!file || !file.buffer){
		errors.push("Missing screenshot in payload.");
	}

	return errors;
}


module.exports = changeScreenshot;
