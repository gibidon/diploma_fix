import { request } from '#utils';

export const removeHotelAsync = (id) => () =>
	request(`/hotels/${id}`, 'DELETE');
