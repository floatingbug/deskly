const {getDB} = require("@config/db");

async function getCanceledBookings({pipeline}){
    try{
        const db = await getDB();
		const cursor = db.collection("canceledBookings").aggregate(pipeline);
		const result = await cursor.toArray();

		return result;
    }
    catch(error){
        throw error;
    }
}

module.exports = getCanceledBookings;
