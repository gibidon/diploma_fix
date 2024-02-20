import { setHotelData } from './set-hotel-data';
import { request } from '#utils';

export const loadHotelAsync = (hotelId) => (dispatch) =>
	request(`/hotels/${hotelId}`).then((hotel) => {
		if (hotel.data) {
			dispatch(setHotelData(hotel.data));
		}

		return hotel;
	});
