import { useRef } from 'react';

export const useDebouncedFunction = (func, delay) => {
	const timeout = useRef(null);

	return (...args) => {
		clearTimeout(timeout.current);
		timeout.current = setTimeout(() => func(...args), delay);
	};
};
