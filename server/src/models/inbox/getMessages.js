const {getDB} = require("@config/db");


async function getMessages({filter}){
	try{
		const db = await getDB();
		const cursor = db.collection("inboxMessages").find(filter);
		const result = await cursor.toArray();

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = getMessages;
