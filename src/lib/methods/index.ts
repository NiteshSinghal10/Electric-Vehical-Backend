export const generateOtp = (digits = 4) =>
	Math.floor(10 ** (digits - 1) + Math.random() * 9 * 10 ** (digits - 1));

export const sendOtp = async (
	otp: number,
	countryCode: string,
	phone: string
) => {
	console.log('hello:', otp, countryCode, phone);
};
