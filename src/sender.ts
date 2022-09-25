import SMTPTransport from "nodemailer/lib/smtp-transport";

import connection from "./transporter";
import logger from "./logger";
import config from "./utils/config";

const transpoter = connection();

async function sendMail(to: string, subject: string, text: string, html?: string): Promise<SMTPTransport.SentMessageInfo | 500> {
	let email: SMTPTransport.SentMessageInfo;

	try {

		email = await transpoter.sendMail({
			from: config.sender,
			to,
			subject,
			text,
			html: html ? html : text
		});

	} catch (err) {

		logger.error(err);
		return 500;
		
	}

	logger.child({
		type: "EMAIL_SENT",
		email,
		to,
		subject,
		text,
		html
	}).info("Email sent");

	return email;
}

export default sendMail;