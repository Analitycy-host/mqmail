import pino from "pino";

const localLogger = (process.env.LOCAL_LOGGER === "true" || process.env.SEQ_URL === undefined) ? true : false;

const logger = pino({
	transport: {
		target: (localLogger) ? "pino-pretty" : "@autotelic/pino-seq-transport",
		options: {
			loggerOpts: {
				serverUrl: process.env.SEQ_URL,
				apiKey: process.env.SEQ_KEY,
			}
		}
	},
	name: "MQMail"
});

if (localLogger) logger.warn("Local logger is enabled. It is not recommended to use it in production environment");

export default logger;