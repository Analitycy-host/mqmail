import express from "express";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import connection from "./transporter";
import auth from "./authentication";
import logger from "./logger";

const app = express();
const transpoter = connection();

const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/send", auth, async (req, res) => {
	const { receiver, subject, text, html } = req.body;

	if (!receiver || !subject || !text) {
		return res.status(400).json({
			message: "Invalid request"
		});
	}

	let email: SMTPTransport.SentMessageInfo;

	try {

		email = await transpoter.sendMail({
			to: receiver,
			from: process.env.SENDER || "no-reply@analitycy.host",
			subject,
			text,
			html: html ? html : text
		});

	} catch (err) {

		logger.error(err);
		return res.status(500).json({
			message: "Unable to send email"
		});

	}

	res.send(email);
});

app.listen(port, () => {
	logger.info(`Server is running on port ${port}`);
});

process.on("uncaughtException", (err) => {
	logger.fatal(err);
});