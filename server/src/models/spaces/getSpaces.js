const {getDB} = require("@config/db");


async function getSpaces(){
	try{
		const db = await getDB();
		const cursor = db.collection("spaces").find();
		const result = await cursor.toArray();

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = getSpaces;
