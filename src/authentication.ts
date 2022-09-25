import { Request, Response, NextFunction } from "express";

import config from "./utils/config";

export default function authentication(req: Request, res: Response, next: NextFunction) {
	const token = req.headers.authorization?.split(" ");
	if (!token || token[0] !== "Bearer") {
		return res.status(401).json({
			message: "Invalid token"
		});
	}

	if (token[1] !== config.httpAuth) {
		return res.status(403).json({
			message: "Not authorized"
		});
	}

	next();
}