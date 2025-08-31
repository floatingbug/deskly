const {getDB} = require("@config/db");


async function addSpace({doc}){
	try{
		const db = await getDB();
		const result = await db.collection("spaces").insertOne(doc);

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = addSpace;
