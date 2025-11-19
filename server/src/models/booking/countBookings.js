const {getDB} = require("@config/db");


async function countBookings({filter}){
	try{
		const db = await getDB();
		const result = db.collection("bookings").countDocuments(filter);

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = countBookings;
