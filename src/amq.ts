import amq from "amqplib";

import logger from "./logger";

const config = {
	uri: process.env.AMQ_URI || "",
	queue: process.env.AMQ_QUEUE || ""
};

export async function connect() {

	const conn = await amq.connect(config.uri, {
		heartbeat: 60
	});
		
	const channel = await conn.createChannel();
	await channel.assertQueue(config.queue, { durable: true });

	return channel;
	
}