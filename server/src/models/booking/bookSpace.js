const {getDB} = require("@config/db");


async function bookSpace({doc}){
	try{
		const db = await getDB();
		const result = await db.collection("bookings").insertOne(doc);

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = bookSpace;
