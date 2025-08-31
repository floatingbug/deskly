const {getDB} = require("@config/db");


async function deleteBooking({doc}){
	try{
		const db = await getDB();
		const result = await db.collection("bookings").deleteOne(doc);

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = deleteBooking;
