const {getDB} = require("@config/db");


async function getMetaData(){
	let totalEntries = 0;

	try{
		const db = await getDB();

		totalEntries = await db.collection("spaces").countDocuments();

		return {
			totalEntries,
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = getMetaData;
