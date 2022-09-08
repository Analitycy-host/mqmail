import nm from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const config = {
	host: process.env.SMTP_HOST || "",
	port: parseInt(process.env.SMTP_PORT || "0"),
	secure: (process.env.IS_SECURE === "true") || false,
	user: process.env.SMTP_USER || "",
	pass: process.env.SMTP_PASS || ""
};

function connect(): nm.Transporter<SMTPTransport.SentMessageInfo> {
	if (config.host === "" || config.port === 0) {
		throw new Error("Host or port is not defined");
	}

	const transporter = nm.createTransport({
		host: config.host,
		port: config.port,
		auth: {
			user: config.user,
			pass: config.pass,
		},
		secure: config.secure
	});

	if (!transporter || transporter instanceof Error) {
		throw new Error("Transporter initialization failed");
	}

	return transporter;
}

export default connect;