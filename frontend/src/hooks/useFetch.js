import { useState, useEffect } from 'react';
import { useLoading } from '#hooks';

export const useFetch = (url, options = {}) => {
	let [data, setData] = useState(null);
	let [error, setError] = useState(null);
	const { setLoading } = useLoading();

	useEffect(() => {
		setLoading(true);

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setData(data);
			})
			.catch((e) => setError(e))
			.finally(() => {
				setLoading(false);
			});
	}, [url, setLoading]);

	return { data, error };
};
