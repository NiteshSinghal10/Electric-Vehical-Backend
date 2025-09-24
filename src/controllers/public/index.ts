import { Router } from 'express';
import bcrypt from 'bcrypt';

import {
	sendResponse,
	MESSAGES,
	generateOtp,
	NODE_ENV,
	sendSms,
	USER_STATUS,
	SALT_ROUNDS,
	otpTemplate,
} from '../../lib';
import {
	forgotPasswordValidation,
	loginValidation,
	resendOtpValidation,
	signUpValidation,
	verifyOtpValidation,
} from '../../middlewares';
import {
	createOtp,
	createUser,
	getOtp,
	getUser,
	updateUser,
} from '../../services';

const router = Router();

router.post('/user/sign-up', signUpValidation, async (req, res) => {
	try {
		const { name, phone, password } = req.body;

		const existingUser = await getUser({
			'phone.phoneNumber': phone.phoneNumber,
		});

		if (existingUser) {
			throw new Error(MESSAGES.EN.USER_ALREADY_EXISTS);
		}

		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

		const user = await createUser({ name, phone, password: hashedPassword });
		const otp = generateOtp();
		await createOtp({ _user: user._id, otp });
		await sendSms(
			otpTemplate(otp),
			user.phone?.countryCode || '',
			user.phone?.phoneNumber || ''
		);

		return sendResponse(res, 200, true, MESSAGES.EN.USER_CREATED_SUCCESSFULLY, {
			user,
			otp: NODE_ENV === 'development' ? otp : '****',
		});
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : MESSAGES.EN.BAD_REQUEST;
		return sendResponse(res, 400, false, errorMessage);
	}
});

router.get('user/login', loginValidation, async (req, res) => {
	try {
		const { phone, password } = req.body;

		const user = await getUser({ 'phone.phoneNumber': phone });

		if (!user) {
			throw new Error(MESSAGES.EN.USER_NOT_FOUND);
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			throw new Error(MESSAGES.EN.INVALID_PASSWORD);
		}

		// TODO: Generate token and send it to the user

		return sendResponse(res, 200, true, MESSAGES.EN.USER_LOGIN_SUCCESSFULLY, {
			user,
		});
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : MESSAGES.EN.BAD_REQUEST;
		return sendResponse(res, 400, false, errorMessage);
	}
});

router.post('/resend-otp', resendOtpValidation, async (req, res) => {
	try {
		const { _user } = req.body;

		const existingOtp = await getOtp({ _user });

		if (existingOtp) {
			throw new Error(MESSAGES.EN.OTP_ALREADY_EXISTS);
		}

		const otp = generateOtp();
		const response = await Promise.all([
			createOtp({ _user, otp }),
			getUser({ _id: _user }),
		]);

		await sendSms(
			otpTemplate(otp),
			response[1]?.phone?.countryCode || '',
			response[1]?.phone?.phoneNumber || ''
		);

		return sendResponse(res, 200, false, MESSAGES.EN.OTP_RESENT_SUCCESSFULLY, {
			otp: NODE_ENV === 'development' ? otp : '****',
		});
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : MESSAGES.EN.BAD_REQUEST;
		return sendResponse(res, 400, false, errorMessage);
	}
});

router.get('/verify-otp', verifyOtpValidation, async (req, res) => {
	try {
		const { _user, otp } = req.body;
		const existingOtp = await getOtp({ _user, otp });

		if (!existingOtp) {
			throw new Error(MESSAGES.EN.OTP_INVALID);
		}

		await updateUser(
			{ _id: _user },
			{ status: USER_STATUS.ACTIVE, 'phone.verified': true }
		);

		// TODO: if purpose is sign-up, generate token and send it to the user
		// TODO: if purpose is forgot-password, generate short live token

		return sendResponse(res, 200, true, MESSAGES.EN.OTP_VERIFIED_SUCCESSFULLY);
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : MESSAGES.EN.BAD_REQUEST;
		return sendResponse(res, 400, false, errorMessage);
	}
});

router.put('/forgot-password', forgotPasswordValidation, async (req, res) => {
	try {
		const { phone } = req.body;

		const user = await getUser({ 'phone.phoneNumber': phone.phoneNumber, 'phone.countryCode': phone.countryCode });

		if (!user) {
			throw new Error(MESSAGES.EN.USER_NOT_FOUND);
		}

		const otp = generateOtp();
		await createOtp({ _user: user._id, otp });
		await sendSms(
			otpTemplate(otp),
			user.phone?.countryCode,
			user.phone?.phoneNumber
		);

		return sendResponse(res, 200, true, MESSAGES.EN.FORGOT_PASSWORD_SUCCESSFULLY, {
			otp: NODE_ENV === 'development' ? otp : '****',
			user
		});
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : MESSAGES.EN.BAD_REQUEST;
		return sendResponse(res, 400, false, errorMessage);
	}
});

export const publicController = router;
