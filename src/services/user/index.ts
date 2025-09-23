import { IUser } from '../../interfaces';
import { USER } from '../../model';

export const createUser = async (user: object) => {
	const newUser = await USER.create(user);
	return newUser;
};

export const getUser = async (
	search = {},
	projection = {},
	options = { new: true }
): Promise<IUser | null> => {
	const user = await USER.findOne(search, projection, options).lean().exec();

	return user as IUser | null;
};

export const getUsers = async (
	search = {},
	projection = {},
	options = { new: true }
) => {
	const users = await USER.find(search, projection, options);
	return users;
};

export const updateUser = async (
	search = {},
	update = {},
	options = { new: true }
) => {
	const user = await USER.findOneAndUpdate(search, update, options);
	return user;
};

export const updateUsers = async (search = {}, update = {}, options = {}) => {
	const users = await USER.updateMany(search, update, options);
	return users;
};
