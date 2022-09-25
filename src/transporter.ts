import nm from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import logger from "./logger";
import config from "./utils/config";

function connect(): nm.Transporter<SMTPTransport.SentMessageInfo> {
	if (config.smtpHost === "" || config.smtpPort === 0) {
		throw logger.fatal("SMTP host or port is not defined");
	}

	const transporter = nm.createTransport({
		host: config.smtpHost,
		port: config.smtpPort,
		auth: {
			user: config.smtpUser,
			pass: config.smtpPass,
		},
		dkim: {
			privateKey: config.dkimKey,
			keySelector: config.dkimSelector,
			domainName: config.domain
		},
		secure: config.smtpSecure
	});

	if (!transporter || transporter instanceof Error) {
		throw logger.fatal("Unable to connect to SMTP server");
	}

	return transporter;
}

export default connect;