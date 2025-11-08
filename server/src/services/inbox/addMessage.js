const inboxModel = require("@models/inbox");
const {ObjectId, client} = require("@config/db");


async function addMessage({user, receiverId = null, conversationId = null, message}){
	const date = new Date();
	let conversation = null;
	const session = client.startSession();

	try{
		session.startTransaction();
		
		// if no conversationId is supported, check if a conversation between user and receiver exists
		if(!conversationId){
			const result = await conversationExists({user, receiverId, session});

			if(!result){
				conversation = await createConversation({user, message, date, receiverId, session});
			}
			else{
				conversation = result;
				await updateConversation({conversationId: conversation._id, user, message, session});
			}
		}
		else{
			conversation = await getConversation({conversationId});
			await updateConversation({conversationId, user, message, session});
		}

		// add message to conversation
		await insertMessage({conversation, user, message, session});
		

		await session.commitTransaction();

		return {
			success: true,
			code: 200,
			message: "message has been added",
		};
	}
	catch(error){
		throw error;
	}
	finally{
		await session.endSession();
	}
}


async function createConversation({user, message, date, receiverId, session}){
	try{
		const conversation = {
			_id: new ObjectId(),
			participants: [
				{
					participantId: new ObjectId(user._id),
					unreadCount: 0,
				},
				{
					participantId: new ObjectId(receiverId),
					unreadCount: 1,
				},
			],
			lastMessage: message,
			lastMessageAt: date,
			createdAt: date,
			updatedAt: date,
		};


		await inboxModel.addConversation({doc: conversation, session});

		return conversation;
	}
	catch(error){
		throw error;
	}
}

async function conversationExists({user, receiverId, session}){
	const filter = {
		participants: {
			$all: [
				{
					$elemMatch: {
						participantId: new ObjectId(user._id),
					},
				},
				{
					$elemMatch: {
						participantId: receiverId,
					},
				},
			],
		},
		"participants.2": {
			$exists: false,
		},
	};

	const result = await inboxModel.getConversation({filter, session});

	return result;
}

async function getConversation({conversationId, session}){
	try{
		const filter = {
			_id: new ObjectId(conversationId),
		};

		const result = await inboxModel.getConversation({filter, session});

		return result;
	}
	catch(error){
		throw error;
	}
}

async function insertMessage({conversation, user, message, session}){
	try{
		const doc = {
			conversationId: new ObjectId(conversation._id),
			messageCreator: new ObjectId(user._id),
			message,
		};

		await inboxModel.addMessage({doc, session});
	}
	catch(error){
		throw error;
	}
}

async function updateConversation({conversationId, user, message, session}){
	const filter = {
		_id: new ObjectId(conversationId),
	};
	const update = {
		$inc: {
			"participants.$[p].unreadCount": 1,
		},
		$set: {
			lastMessage: message,
			lastMessageAt: Date.now(),
			updatedAt: Date.now(),
		},
	};
	const options = {
		arrayFilters: [
			{
				"p.participantId": {
					$ne: new ObjectId(user._id),
				},
			},
		],
		session,
	};

	await inboxModel.updateConversation({filter, update, options});
}


module.exports = addMessage;
