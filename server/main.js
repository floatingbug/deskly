require('module-alias/register')
require("dotenv").config();
const express = require("express");
const http = require("http");
const app = express();
const httpServer = http.createServer(app);
const apiRouter = require("@router/apiRouter");
const response = require("@utils/response");
const {connectDB} = require("@config/db");
const cors = require("cors");


connectDB();
const PORT = process.env.PORT || 8000;

app.use(cors({
	origin: "*",
}));
app.use(express.json());
app.use("/api", apiRouter);


app.use("/", (err, req, res, next) => {
	console.log(err);

	response(res, {
		success: false,
		code: 500,
		errors: ["Internal Server Error"],
	});
});


httpServer.listen(PORT, () => {
	console.log(`App is listening on port: ${PORT}`);
});
