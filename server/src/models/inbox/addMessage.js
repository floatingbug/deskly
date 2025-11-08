const {getDB} = require("@config/db");


async function addMessage({doc, session}){
	try{
		const options = session ? {session} : {};
		const db = await getDB();
		const result = db.collection("inboxMessages").insertOne(doc, options);

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = addMessage;
