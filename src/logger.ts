import pino from "pino";

import config from "./utils/config";

const logger = pino({
	transport: {
		target: (config.localLogger) ? "pino-pretty" : "@autotelic/pino-seq-transport",
		options: {
			loggerOpts: {
				serverUrl: config.seqUrl,
				apiKey: config.seqKey,
			}
		}
	},
	name: "MQMail"
});

if (config.localLogger) logger.warn("Local logger is enabled. It is not recommended to use it in production environment");

export default logger;