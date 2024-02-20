import { useContext } from 'react';
import { LoadingContext } from '../contexts/loading';

export const useLoading = () => {
	const context = useContext(LoadingContext);

	return context;
};
