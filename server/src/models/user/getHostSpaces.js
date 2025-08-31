const {getDB} = require("@config/db");


async function getHostSpaces({query}){
	try{
		const db = await getDB();
		const cursor = db.collection("spaces").find(query);
		const result = await cursor.toArray();

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = getHostSpaces;
