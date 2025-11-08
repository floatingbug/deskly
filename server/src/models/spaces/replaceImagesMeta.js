const {getDB} = require("@config/db");


async function replaceImagesMeta({filter, update}){
	const db = await getDB();
	const result = await db.collection("spaces").updateOne(filter, update);

	return result;
}


module.exports = replaceImagesMeta;
