import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

import { MESSAGES, OTP_PURPOSE, sendResponse } from '../../../lib';

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
			password: joi
				.string()
				.required()
				.min(8)
				.pattern(
					new RegExp(
						'^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=[\\]{};:"\\\\|,.<>/?]).+$'
					)
				)
				.message(MESSAGES.EN.PASSWORD_INVALID),
		})
		.validate(req.body);

	if (error) {
		return sendResponse(res, 400, false, error.message, error);
	}

	next();
};

export const resendOtpValidation = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { error } = joi
		.object({
			_user: joi.string().hex().length(24).required(),
		})
		.validate(req.body);

	if (error) {
		return sendResponse(res, 400, false, error.message, error);
	}

	next();
};

export const verifyOtpValidation = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { error } = joi
		.object({
			_user: joi.string().hex().length(24).required(),
			otp: joi.string().required(),
			purpose: joi.string().valid(OTP_PURPOSE.SIGN_UP, OTP_PURPOSE.FORGOT_PASSWORD).required(),
		})
		.validate(req.body);

	if (error) {
		return sendResponse(res, 400, false, error.message, error);
	}

	next();
};

export const loginValidation = (req: Request, res: Response, next: NextFunction) => {
	const { error } = joi
		.object({
			phone: joi.string().required(),
			password: joi.string().required(),
		})
		.validate(req.body);

	if (error) {
		return sendResponse(res, 400, false, error.message, error);
	}

	next();
};

export const forgotPasswordValidation = (req: Request, res: Response, next: NextFunction) => {
	const { error } = joi
		.object({
			phone: joi.object({
				countryCode: joi.string().required(),
				phoneNumber: joi.string().required(),
			}).required(),
		})
		.validate(req.body);

	if (error) {
		return sendResponse(res, 400, false, error.message, error);
	}

	next();
};