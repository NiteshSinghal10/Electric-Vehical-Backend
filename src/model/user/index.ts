import { Schema, model } from 'mongoose';
import { USER_STATUS } from '../../lib';

const userStatusEnum = Object.values(USER_STATUS);

const phoneSchema = new Schema(
	{
		countryCode: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
			unique: true,
		},
		verified: {
			type: Boolean,
			default: false,
		},
	},
	{ _id: false }
);

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		phone: {
			type: phoneSchema,
		},
		password: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: userStatusEnum,
			default: USER_STATUS.PENDING,
		},
	},
	{ timestamps: true }
);

export const USER = model('User', userSchema);
