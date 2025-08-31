const { getDB } = require("@config/db");


async function getCanceledBookings({ aggregation }) {
    try {
        const db = await getDB();
        return await db.collection("canceledBookings")
                       .aggregate(aggregation)
                       .toArray();
    } catch (error) {
        throw error;
    }
}


module.exports = getCanceledBookings;
