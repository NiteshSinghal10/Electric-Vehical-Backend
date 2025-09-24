import jwt, { VerifyOptions, SignOptions } from 'jsonwebtoken';
import { privateKey, publicKey } from '../keys';
import { ITokenPayload } from '../../interfaces';

export const generateToken = (
	payload: ITokenPayload,
	options: SignOptions = {
		algorithm: 'RS256',
		issuer: 'electric-vehical-app',
		audience: 'electric-vehical-app',
	}
) => {
	return jwt.sign(payload, privateKey, options);
};

export const verifyToken = (
	token: string,
	options: VerifyOptions = {
		algorithms: ['RS256'],
		issuer: 'electric-vehical-app',
		audience: 'electric-vehical-app',
	}
) => {
	return jwt.verify(token, publicKey, options);
};
