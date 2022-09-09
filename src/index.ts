import express from "express";

import auth from "./authentication";
import sendMail from "./sender";
import logger from "./logger";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/send", auth, async (req, res) => {
	const { receiver, subject, text, html } = req.body;

	if (!receiver || !subject || !text) {
		return res.status(400).json({
			message: "Invalid request"
		});
	}

	const email = await sendMail(receiver, subject, text, html);

	if (email === 500) {
		return res.status(500).json({
			message: "Internal server error"
		});
	} else {
		return res.status(200).json({
			message: "Email sent",
			email
		});
	}
});

app.listen(port, () => {
	logger.info(`Server is running on port ${port}`);
});

process.on("uncaughtException", (err) => {
	logger.fatal(err);
});