const {getDB} = require("@config/db");


async function addCanceledBooking({doc}){
	try{
		const db = await getDB();

		const result = await db.collection("canceledBookings").insertOne(doc);

		return result;
	}
	catch(error){
	}
}


module.exports = addCanceledBooking;
