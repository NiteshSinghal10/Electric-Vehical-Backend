import { ITokenPayload } from './user';

export * from './user';

// Extend Express Request interface using module augmentation
declare module 'express-serve-static-core' {
	interface Request {
		user: ITokenPayload;
	}
}
