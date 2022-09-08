import express from "express";

import connection from "./transporter";
import auth from "./authentication";

const app = express();
const transpoter = connection();

const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/send", auth, async (req, res) => {
	const { receiver, subject, text, html } = req.body;

	if (!receiver || !subject || !text) {
		return res.status(400).json({
			message: "Invalid request"
		});
	}

	const email = await transpoter.sendMail({
		to: receiver,
		from: process.env.SENDER || "no-reply@analitycy.host",
		subject,
		text,
		html: html ? html : text
	});

	res.send(email);
});

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});