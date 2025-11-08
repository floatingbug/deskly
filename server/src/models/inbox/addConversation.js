const {getDB} = require("@config/db");


async function addConversation({doc, session}){
	try{
		const options = session ? {session} : {};
		const db = await getDB();
		const result = await db.collection("conversations").insertOne(doc, options);

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = addConversation;
