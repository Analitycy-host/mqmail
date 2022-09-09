import nm from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import logger from "./logger";

const config = {
	host: process.env.SMTP_HOST || "",
	port: parseInt(process.env.SMTP_PORT || "0"),
	secure: (process.env.IS_SECURE === "true") || false,
	user: process.env.SMTP_USER || "",
	pass: process.env.SMTP_PASS || "",
	dkim: process.env.DKIM_KEY || "",
	keySelector: process.env.DKIM_SELECTOR || "",
	domain: process.env.DOMAIN || ""
};

function connect(): nm.Transporter<SMTPTransport.SentMessageInfo> {
	if (config.host === "" || config.port === 0) {
		throw logger.fatal("SMTP host or port is not defined");
	}

	const transporter = nm.createTransport({
		host: config.host,
		port: config.port,
		auth: {
			user: config.user,
			pass: config.pass,
		},
		dkim: {
			privateKey: config.dkim,
			keySelector: config.keySelector,
			domainName: config.domain
		},
		secure: config.secure
	});

	if (!transporter || transporter instanceof Error) {
		throw logger.fatal("Unable to connect to SMTP server");
	}

	return transporter;
}

export default connect;