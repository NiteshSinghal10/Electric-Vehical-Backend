import { ObjectId } from 'mongoose';

export interface IPhone {
	countryCode: string;
	phoneNumber: string;
	verified: boolean;
}

export interface IUser {
	_id: ObjectId;
	name: string;
	phone: IPhone;
	password: string;
	status: string;
	createdAt?: Date;
	updatedAt?: Date;
}
