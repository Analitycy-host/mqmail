import amq from "amqplib";

import config from "./utils/config";

export async function connect() {

	const conn = await amq.connect(config.amqUri, {
		heartbeat: 60
	});
		
	const channel = await conn.createChannel();
	await channel.assertQueue(config.amqQueue, { durable: true });

	return channel;
	
}