import api from '../api';
import { ApiContext } from '#contexts';

export const ApiProvider = ({ children }) => {
	return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};
