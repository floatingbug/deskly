const {getDB} = require("@config/db");


async function getSpaceById({query}){
	try{
		const db = await getDB();
		const result = await db.collection("spaces").findOne(query);
		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = getSpaceById;
