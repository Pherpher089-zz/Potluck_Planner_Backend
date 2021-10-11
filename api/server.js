const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("../auth/auth-router.js");
const usersRouter = require("./routes/users-router.js");
const potlucksRouter = require("./routes/potlucks-router.js");
const foodRouter = require("./routes/food-router.js");

var corsOptions = {
	origin: '*',
	allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept', 'auth'],
	methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
const server = express();
server.use(bodyParser({ extended: false }));
server.use(helmet());
server.use(cors());
server.options("*", cors())

// server.use(function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	next();
//   });


server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/potlucks", potlucksRouter);
server.use("/api/food", foodRouter);

server.get("/", async (req, res) => {
	res.json({ message: "Its Alive!" });
});

module.exports = server;
