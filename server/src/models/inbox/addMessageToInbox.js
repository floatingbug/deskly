const {getDB} = require("@config/db");


async function addMessageToInbox({doc}){
	try{
		const db = await getDB();
		const result = db.collection("inboxMessages").insertOne(doc);

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = addMessageToInbox;
