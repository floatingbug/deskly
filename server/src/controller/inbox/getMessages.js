const response = require("@utils/response");
const inboxService = require("@services/inbox");


async function getMessages(req, res, next){
	const conversationId = req.query.conversationId;

	try{
		const result = await inboxService.getMessages({
			user: req.user,
			conversationId,
		});
		
		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = getMessages;
