import { OTP } from '../../model';

export const createOtp = async (data: object) => {
	const newOtp = await OTP.create(data);
	return newOtp;
};

export const getOtp = async (
	search: object,
	projection: object,
	options: object
) => {
	const otp = await OTP.findOne(search, projection, options);
	return otp;
};
