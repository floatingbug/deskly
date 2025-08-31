const inboxModel= require("@models/inbox");


async function addMessageToInbox({user, creatorId, message}){
	try{
		const doc = {
			messageSenderId: user._id,
			messageReceiverId: creatorId,
			message,
		};

		const result = await inboxModel.addMessageToInbox({doc});

		return {
			success: true,
			code: 200,
			message: "Message has been sent.",
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = addMessageToInbox;
