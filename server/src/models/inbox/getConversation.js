const {getDB} = require("@config/db");


async function getConversation({filter, session}){
	try{
		const options = session ? {session} : {}
		const db = await getDB();
		const result = await db.collection("conversations").findOne(filter, options);

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = getConversation;
