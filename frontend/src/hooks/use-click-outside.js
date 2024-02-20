import { useEffect } from 'react';

export const useClickOutside = (elRef, callback) => {
	useEffect(() => {
		function clickHandler(e) {
			if (elRef.current) {
				if (!elRef.current.contains(e.target)) {
					callback(e);
				}
			}
		}

		window.addEventListener('click', clickHandler);

		return () => {
			window.removeEventListener('click', clickHandler);
		};
	}, [elRef, callback]);

	return null;
};
