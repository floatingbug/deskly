const {getDB} = require("@config/db");


async function updateScreenshotOrder({filter, doc}){
	try{
		const db = await getDB();
		const result = await db.collection("spaces").updateOne(filter, doc);

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = updateScreenshotOrder;
