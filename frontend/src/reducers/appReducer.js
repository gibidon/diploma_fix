import { ACTION_TYPE } from '#actions';

const initialAppState = {
	wasLogout: false,
	modal: { isOpen: false, text: '', onConfirm: () => {}, onCancel: () => {} },
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				wasLogout: !state.wasLogout,
			};
		case ACTION_TYPE.OPEN_MODAL:
			return {
				...state,
				modal: { ...state.modal, isOpen: true, ...action.payload },
			};

		case ACTION_TYPE.CLOSE_MODAL:
			return initialAppState;

		default:
			return state;
	}
};
