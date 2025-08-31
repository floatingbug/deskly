const {getDB} = require("@config/db");


async function getSpaces({pagination, sortings, filter}){
	try{
		const db = await getDB();

		const totalEntries = await db.collection("spaces").countDocuments(filter);

		const cursor = await db.collection("spaces").find(filter);

		if(sortings){
			cursor.sort(sortings)
		}
		
		if(pagination){
			cursor.skip(pagination.skip);
			cursor.limit(pagination.limit);
		}

		const spaces = await cursor.toArray();

		return {
			spaces,
			totalEntries,
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = getSpaces;
