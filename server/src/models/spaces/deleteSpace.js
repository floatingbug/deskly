const {getDB} = require("@config/db");


async function deleteSpace({filter}){
	try{
		const db = await getDB();

		const result = await db.collection("spaces").deleteOne(filter);

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = deleteSpace;
