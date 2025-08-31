const testRouter = require("express").Router();
const testController = require("@controller/test");


testRouter.get("/", testController.test);


module.exports = testRouter; 