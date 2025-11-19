const getSpaces = require("./getSpaces");
const getMetaData = require("./getMetaData");
const getSpaceById = require("./getSpaceById");
const addSpace = require("./addSpace");
const updateSpace = require("./updateSpace");
const deleteSpace = require("./deleteSpace");
const updateScreenshotOrder = require("./updateScreenshotOrder");
const deleteImage = require("./deleteImage");
const replaceImagesMeta = require("./replaceImagesMeta");


module.exports = {
	getSpaces,
	getMetaData,
	getSpaceById,
	addSpace,
	updateSpace,
	deleteSpace,
	updateScreenshotOrder,
	deleteImage,
	replaceImagesMeta,
};
