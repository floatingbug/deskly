const {getDB} = require("@config/db");


async function getConversations({filter}){
	try{
		const db = await getDB();
		const cursor = db.collection("conversations").find(filter);
		const result = await cursor.toArray();

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = getConversations;
