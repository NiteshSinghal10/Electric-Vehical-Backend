import { Schema, model } from 'mongoose';

const otpSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 // TTL: document expires 60 seconds (1 minute) after createdAt
  }
}, { timestamps: true });

export const OTP = model('Otp', otpSchema);