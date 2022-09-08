import { Request, Response, NextFunction } from "express";

const authToken = process.env.TOKEN || "8F3AE7CB-7ECB-48AE-A1B1-9FDE510548AE";

export default function authentication(req: Request, res: Response, next: NextFunction) {
	const token = req.headers.authorization?.split(" ");
	if (!token || token[0] !== "Bearer") {
		return res.status(401).json({
			message: "Invalid token"
		});
	}

	if (token[1] !== authToken) {
		return res.status(403).json({
			message: "Not authorized"
		});
	}

	next();
}