import fs from 'fs';
import path from 'path';

const privateKeysPath = path.join(__dirname, 'private.pem');
const publicKeysPath = path.join(__dirname, 'public.pem');

export const privateKey = fs.readFileSync(privateKeysPath, 'utf8');

export const publicKey = fs.readFileSync(publicKeysPath, 'utf8');
