require("dotenv").config();
const express = require("express");
const next = require("next");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { errorController } = require("./server/controllers/errorController");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev, dir: "." });
const handle = nextApp.getRequestHandler();
const eventsRouter = require("./server/routes/eventsRouter");
const authRouter = require("./server/routes/authRouter");
const bookingRouter = require("./server/routes/bookingRouter");
const port = process.env.PORT || 3000;
const morgan = require('morgan');

console.log("⏳ Waiting for Next.js and DB to initialize...");

nextApp.prepare().then(() => {
	const app = express();

	db_str = process.env.DB_LINK;
	const db_connect = async () =>
		await mongoose
			.connect(db_str, {
				useNewUrlParser: true
				// useUnifiedTopology: true,
			})
			.then(() => {
				console.log("DB Connected");
			})
			.catch((err) => {
				console.log(err);
				throw err;
			});

	db_connect()
		.then(() => {
			console.log("✅ Database connected");

			app.use(morgan('dev')); // Use 'combined' format for detailed request logs

			// Middleware
			app.use(express.json());
			app.use(cookieParser());
			app.use(express.urlencoded({ extended: true }));
			app.use(bodyParser.urlencoded({ extended: true }));

			// Routes
			app.use("/api/v1/events", eventsRouter);
			app.use("/api/v1/auth", authRouter);
			app.use("/api/v1/bookings", bookingRouter);
			app.use(errorController);

			app.all("/{*any}", (req, res) => {
				return handle(req, res); // Pass to Next.js frontend
			});

			// Start server
			app.listen(port, () => {
				console.log(`🚀 Listening on http://localhost:${port}`);
			});
		})
		.catch((err) => {
			console.error(err);
		});
});

process.on("uncaughtException", (err) => {
	console.error("⨯ uncaughtException:", err.stack || err);
});
