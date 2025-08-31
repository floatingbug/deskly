const {getDB} = require("@config/db");


async function updateSpace({filter, update}){
	try{
		const db = await getDB();
		
		const result = await db.collection("spaces").updateOne(filter, update);

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = updateSpace;
