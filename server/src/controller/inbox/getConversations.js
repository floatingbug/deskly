const inboxService = require("@services/inbox");
const response = require("@utils/response");


async function getConversations(req, res, next){
	try{
		const result = await inboxService.getConversations({user: req.user});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = getConversations;
