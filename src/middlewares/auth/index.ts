import { Request, Response, NextFunction } from 'express';

import { verifyToken, sendResponse, MESSAGES } from '../../lib';
import { ITokenPayload } from '../../interfaces';

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return sendResponse(res, 401, false, MESSAGES.EN.TOKEN_NOT_FOUND);
	}
	const payload = verifyToken(token);
	req.user = payload as ITokenPayload;
	next();
};
