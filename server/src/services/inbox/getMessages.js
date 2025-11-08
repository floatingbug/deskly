const inboxModel = require("@models/inbox");
const {ObjectId} = require("@config/db");


async function getMessages({user, conversationId}){
	try{
		const filter = {
			conversationId: new ObjectId(conversationId),
		};

		const result = await inboxModel.getMessages({filter});

		await updateConversation({user, conversationId});

		return {
			success: true,
			code: 200,
			message: "Sent messages",
			data: result,
		};
	}
	catch(error){
		throw error;
	}
}


async function updateConversation({user, conversationId}){
	const filter = {
		_id: new ObjectId(conversationId),
	};
	const update = {
		$set: {
			"participants.$[p].unreadCount": 0,
		},
	};
	const options = {
		arrayFilters: [
			{ "p.participantId": new ObjectId(user._id) }
		],
	};


	const result = await inboxModel.updateConversation({filter, update, options});
}


module.exports = getMessages;
