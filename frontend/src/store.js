import {
	legacy_createStore as createStore,
	combineReducers,
	applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';

import {
	appReducer,
	hotelReducer,
	hotelsReducer,
	userReducer,
	usersReducer,
} from './reducers';

import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
	app: appReducer,
	hotel: hotelReducer,
	hotels: hotelsReducer,
	user: userReducer,
	users: usersReducer,
});

export const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(thunk)),
);
