import { request } from '#utils';
import { removeReview } from './remove-review';

export const removeReviewAsync = (hotelId, reviewId) => (dispatch) => {
	request(`/hotels/${hotelId}/reviews/${reviewId}`, 'DELETE').then(() => {
		dispatch(removeReview(reviewId));
	});
};
