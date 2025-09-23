import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV;
export const MONGO_URI = process.env.MONGO_URI;
export const TWILIO_USERNAME = process.env.TWILIO_USERNAME;
export const TWILIO_PASSWORD = process.env.TWILIO_PASSWORD;
export const TWILIO_API = process.env.TWILIO_API;
export const TWILIO_FROM = process.env.TWILIO_FROM;
