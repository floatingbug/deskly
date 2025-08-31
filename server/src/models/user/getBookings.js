const {getDB} = require("@config/db");


async function getBookings({pipeline}){
	try{
		const db = await getDB();
		const cursor = db.collection("bookings").aggregate(pipeline);
		const result = await cursor.toArray();

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = getBookings;
