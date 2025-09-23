import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

import { sendResponse } from '../../../lib';

export const signUpValidation = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { error } = joi
		.object({
			name: joi.string().required(),
			phone: joi.object({
				countryCode: joi.string().required(),
				phoneNumber: joi.string().required(),
			}),
			password: joi.string().required(),
		})
		.validate(req.body);

	if (error) {
		return sendResponse(res, 400, false, error.message, error);
	}

	next();
};
