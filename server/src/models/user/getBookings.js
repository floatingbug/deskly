const {getDB} = require("@config/db");


async function getBookings({query}){
	try{
		const db = await getDB();
		const cursor = await db.collection("bookings").find(query);
		const result = cursor.toArray();

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = getBookings;
