import { Router } from 'express';

import { MESSAGES, sendResponse } from '../../lib';
import { getUser } from '../../services';

const router = Router();

router.get('/profile', async (req, res) => {
	try {
		const { _id } = req.user;
		const user = await getUser({ _id });
		return sendResponse(
			res,
			200,
			true,
			MESSAGES.EN.USER_PROFILE_FETCHED_SUCCESSFULLY,
			user
		);
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : MESSAGES.EN.BAD_REQUEST;
		return sendResponse(res, 400, false, errorMessage);
	}
});

export const userController = router;
