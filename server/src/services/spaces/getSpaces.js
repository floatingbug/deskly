const spacesModel = require("@models/spaces");


async function getSpaces({queries}){
	const page = Number(queries.page);
	const limit = Number(queries.limit);
	let sortings = {};
	let filter = {};

	try{
		// set pagination
		const pagination= {
			skip: page * limit,
			limit,
		};

		//set filter
		filter = createFilter({queries});

		// set sortings
		sortings = createSortings({queries});

		// get spaces
		const result = await spacesModel.getSpaces({pagination, sortings, filter});

		return {
			success: true,
			code: 200,
			message: "Sent spaces",
			data: {
				spaces: result.spaces,
				metaData: {
					totalEntries: result.totalEntries,
				}
			},
		};
	}
	catch(error){
		throw error;
	}
}


function createSortings({queries}){
	let createdSortingsObj = {};

	if(queries.hourlyRate && queries.hourlyRate === "ascending") createdSortingsObj.hourlyRate = 1;
	if(queries.hourlyRate && queries.hourlyRate === "descending") createdSortingsObj.hourlyRate = -1;
	if(queries.capacity && queries.capacity === "ascending") createdSortingsObj.capacity = 1;
	if(queries.capacity && queries.capacity === "descending") createdSortingsObj.capacity = -1;
	if(queries.createdAt && queries.createdAt === "ascending") createdSortingsObj.createdAt = 1;
	if(queries.createdAt && queries.createdAt === "descending") createdSortingsObj.createdAt = -1;

	return createdSortingsObj;
}

function createFilter({queries}){
	let createdFilterObj = {};

	if(queries.searchInput){
		 createdFilterObj.location = { $regex: queries.searchInput, $options: "i" };
	}

	if(queries.hourlyRate){
		createdFilterObj.hourlyRate = {
			$lte: Number(queries.hourlyRate),
		}
	}
	if(queries.capacity) {
		createdFilterObj.capacity = {
			$gte: Number(queries.capacity),
		}
	}

	if(queries.amenities){
		const amenitiesArray = queries.amenities.split(",");

		createdFilterObj.amenities = {
			$all: amenitiesArray.map(amenity => {
				return {
					$elemMatch: {
						id: amenity
					},
				};
			})
		}
	}

	return createdFilterObj;
}


module.exports = getSpaces;
