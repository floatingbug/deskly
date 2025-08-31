const {getDB} = require("@config/db");


async function getUserById({filter}){
	try{
		const db = await getDB();
		
		const result = db.collection("users").findOne(filter);

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = getUserById;
