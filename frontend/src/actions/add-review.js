import { ACTION_TYPE } from './action-type';

export const addReview = (review) => ({
	type: ACTION_TYPE.ADD_REVIEW,
	payload: review,
});
