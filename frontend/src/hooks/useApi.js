import { useState, useEffect, useContext } from 'react';
import { useLoading } from '#hooks';
import { ApiContext } from '#contexts/api';

export function useApi(key, ...args) {
	const api = useContext(ApiContext);
	const apiFunction = key.split('.').reduce((obj, name) => obj[name], api);
	const { setLoading } = useLoading();

	const [data, setData] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		apiFunction(...args)
			.then((data) => {
				setData(data);
			})
			.catch((e) => setError(e))
			.finally(() => setLoading(false));
	}, [...args]);

	return { data, error };
}
