import { setHotelData } from './set-hotel-data';
import { request } from '#utils';

export const saveHotelAsync = (id, newHotelData) => (dispatch) => {
	const saveRequest = id
		? request(`/hotels/${id}`, 'PATCH', newHotelData)
		: request('/hotels/create', 'POST', newHotelData);

	return saveRequest.then((updatedHotel) => {
		dispatch(setHotelData(updatedHotel.data));

		return updatedHotel.data;
	});
};
