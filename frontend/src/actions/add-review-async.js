import { request } from '#utils';
import { addReview } from './add-review';

export const addReviewAsync = (hotelId, content) => (dispatch) => {
	request(`/hotels/${hotelId}/reviews`, 'POST', { content }).then((review) => {
		dispatch(addReview(review.data));
	});
};
