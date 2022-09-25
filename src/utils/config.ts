const config = {
	httpAuth: process.env.TOKEN || "8F3AE7CB-7ECB-48AE-A1B1-9FDE510548AE",
	httpPort: parseInt(process.env.PORT || "3000"),
	amqUri: process.env.AMQ_URI || "",
	amqQueue: process.env.AMQ_QUEUE || "",
	localLogger: (process.env.LOCAL_LOGGER === "true" || process.env.SEQ_URL === undefined) ? true : false,
	seqUrl: process.env.SEQ_URL || "",
	seqKey: process.env.SEQ_KEY || "",
	smtpHost: process.env.SMTP_HOST || "",
	smtpPort: parseInt(process.env.SMTP_PORT || "587"),
	smtpSecure: (process.env.IS_SECURE === "true") || false,
	smtpUser: process.env.SMTP_USER || "",
	smtpPass: process.env.SMTP_PASS || "",
	dkimKey: process.env.DKIM_KEY || "",
	dkimSelector: process.env.DKIM_SELECTOR || "",
	domain: process.env.DOMAIN || "",
	sender: process.env.SENDER || "no-reply@analitycy.host"
};

export default config;