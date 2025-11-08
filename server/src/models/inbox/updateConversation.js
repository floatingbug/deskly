const {getDB} = require("@config/db");


async function updateConversation({filter, update, options = {}}){
	try{
		const db = await getDB();
		const result = await db.collection("conversations").updateOne(filter, update, options);

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = updateConversation;
