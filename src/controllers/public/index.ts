import { Router } from 'express';

import { sendResponse, MESSAGES } from '../../lib';
import { signUpValidation } from '../../middlewares';
import { createUser, getUser } from '../../services';

const router = Router();

router.post('/user/sign-up', signUpValidation, async(req, res) => {
  try {
    const { name, phone, password } = req.body;

    const existingUser = await getUser({ phone: phone.phoneNumber });

    if (existingUser) {
      throw new Error(MESSAGES.EN.USER_ALREADY_EXISTS);
    }

    const user = await createUser({ name, phone, password });

    return sendResponse(res, 200, true, MESSAGES.EN.USER_CREATED_SUCCESSFULLY, user);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : MESSAGES.EN.BAD_REQUEST;
    return sendResponse(res, 400, false, errorMessage, error);
  }
});

router.post('/resend-otp', async(req, res) => {
  try {
    const { phone } = req.body;

    return sendResponse(res, 200, false, MESSAGES.EN.OTP_RESENT_SUCCESSFULLY);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : MESSAGES.EN.BAD_REQUEST;
    return sendResponse(res, 400, false, errorMessage, error);
  }
});


export const publicController = router;