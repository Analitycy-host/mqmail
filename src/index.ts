import express from "express";

import auth from "./authentication";
import sendMail from "./sender";
import { connect } from "./amq";
import logger from "./logger";
import { EmailMessage } from "./types";

// Express portion

const app = express();

const port = process.env.PORT || 3000;

app.use(
	express.json()
);

app.disable("x-powered-by");

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

// AMQ portion

connect().then((channel) => {

	channel.consume(process.env.AMQ_QUEUE || "", async (msg) => {
		if (msg !== null) {
			const email = msg.content.toString();
			let parsedEmail: EmailMessage;

			try {
				parsedEmail = JSON.parse(email);
			} catch (error) {
				channel.ack(msg);
				return logger.child({
					msg
				}).error("Unable to parse email");
			}

			const { to, subject, text, html } = parsedEmail;
			if (!to || !subject || !text) {
				logger.error("Invalid email");
				channel.ack(msg);
				return;
			}
			const sentEmail = await sendMail(to, subject, text, html);

			if (sentEmail === 500) {
				logger.error("Unable to send email");
			}

			channel.ack(msg);
			return;

		}
		
		logger.error("Message is null");
		return;
		
	});

});

// Super advanced error handling

process.on("uncaughtException", (err) => {
	logger.fatal(err);
});