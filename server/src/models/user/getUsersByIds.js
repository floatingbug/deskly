const {getDB} = require("@config/db");


async function getUsersByIds({filter}){
	try{
		const db = await getDB();
		const cursor = db.collection("users").find(filter);
		const result = await cursor.toArray();

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = getUsersByIds;
