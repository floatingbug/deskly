const inboxModel = require("@models/inbox");
const userModel = require("@models/user");
const {ObjectId} = require("@config/db");


async function getConversations({user}) {
	let conversations = [];

	try {
		// get all conversations
		const filter = { "participants.participantId": new ObjectId(user._id)};
		conversations = await inboxModel.getConversations({ filter });
	} 
	catch (error) {
		throw error;
	}

	try {
		// extract all chatPartners
		const chatPartners = [];
		const chatPartnerIds = [];

		for(let i = 0; i < conversations.length; i++){
			for(let j = 0; j < conversations[i].participants.length; j++){
				if(conversations[i].participants[j].participantId != user._id){
					chatPartners.push(
						{
							conversationId: new ObjectId(conversations[i]._id),
							participantId: new ObjectId(conversations[i].participants[j].participantId),
						}
					);
					chatPartnerIds.push(
						new ObjectId(conversations[i].participants[j].participantId),
					);
				}
			}
		}

		// get all chatPartners
		const users = await userModel.getUsersByIds({
			filter: { _id: { $in: chatPartnerIds } },
		});

		// map conversationId to users
		users.forEach(u => {
			chatPartners.forEach(p => {
				if(String(p.participantId) === String(u._id)){
					u.conversationId = p.conversationId;
				}
			});
		});

		// map chatPartners to conversations
		conversations.forEach(c => {
			c.chatPartners = [];

			users.forEach(u => {
				if(String(c._id) === String(u.conversationId)){
					c.chatPartners.push(u);
				}
			});
		});

		return {
			success: true,
			code: 200,
			message: "Sent all conversations.",
			data: conversations,
		};
	}
	catch (error) {
		throw error;
	}
}


module.exports = getConversations;
