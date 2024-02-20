import { useState } from 'react';
import { LoadingContext } from '#contexts';

export const LoadingProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const contextValue = { loading, setLoading };

	return (
		<LoadingContext.Provider value={contextValue}>{children}</LoadingContext.Provider>
	);
};
