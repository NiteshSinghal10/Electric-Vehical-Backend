import axios from 'axios';
import { TWILIO_API, TWILIO_PASSWORD, TWILIO_FROM, TWILIO_USERNAME } from '../env-variables';

export const generateOtp = (digits = 4) =>
	Math.floor(10 ** (digits - 1) + Math.random() * 9 * 10 ** (digits - 1));

export const sendSms = async (
	message: string,
	countryCode: string,
	phone: string
) => {
	const auth = Buffer.from(`${TWILIO_USERNAME}:${TWILIO_PASSWORD}`).toString('base64');

	const response = await axios.post(
		`${TWILIO_API}`,
		{
			To: `${countryCode}${phone}`,
			From: TWILIO_FROM,
			Body: message,
		},
		{
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': `Basic ${auth}`,
			}
		}
	);

	return response.data;
};
