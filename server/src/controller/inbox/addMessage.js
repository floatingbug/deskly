const response = require("@utils/response");
const inboxService = require("@services/inbox");
const {ObjectId} = require("@config/db");


async function addMessage(req, res, next){
	let params = {};

	if(req.body.receiverId) params.receiverId = req.body.receiverId;
	if(req.body.conversationId) params.conversationId = req.body.conversationId;
	params.message = req.body.message;
	params.user = req.user;

	const errors = validateParams(params)

	if(errors.length > 0){
		return response(res, {
			success: false,
			code: 400,
			errors,
		});
	}

	try{
		const result = await inboxService.addMessage(params);

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


function validateParams(params){
	const errors = [];

	if(params.receiverId){
		if(!ObjectId.isValid(params.receiverId)){
			errors.push("No valid receiverId. You may have tried to send a message to a test account.");
		}
	}

	return errors;
}


module.exports = addMessage;
