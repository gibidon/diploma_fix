import { ACTION_TYPE } from '../actions';

const initialHotelState = {
	id: '',
	title: '',
	rating: null,
	description: '',
	reviews: [],
	images: [],
};

export const hotelReducer = (state = initialHotelState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_HOTEL_DATA:
			return { ...state, ...action.payload };
		case ACTION_TYPE.RESET_HOTEL_DATA: {
			return initialHotelState;
		}
		case ACTION_TYPE.ADD_REVIEW:
			return { ...state, reviews: [...state.reviews, action.payload] };

		default:
			return state;
	}
};
