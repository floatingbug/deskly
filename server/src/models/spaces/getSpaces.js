const {getDB} = require("@config/db");


async function getSpaces({pagination, sortings, filter}){
	const skip = pagination.skip;
	const limit = pagination.limit;

	try{
		const db = await getDB();

		const totalEntries = await db.collection("spaces").countDocuments(filter);

		const cursor = await db.collection("spaces").find(filter);
		cursor.sort(sortings)
		cursor.skip(skip);
		cursor.limit(limit);

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
