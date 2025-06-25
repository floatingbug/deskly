const {getDB} = require("config/db");


async function register({doc}){
	try{
		const db = await getDB();
		const result = await db.collection("users").insertOne(doc);

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = register;
