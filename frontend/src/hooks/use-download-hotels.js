import { useState, useEffect } from 'react';
import { useLoading } from '#hooks';

export const useDownloadHotels = (
	searchPhrase = '',
	page,
	PAGINATION_LIMIT,
	country = '',
	min = 1,
	max = 999,
) => {
	const [hotels, setHotels] = useState([]);
	const { setLoading } = useLoading();

	useEffect(() => {
		setLoading(true);
		fetch(
			`/hotels?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}&country=${country}&min=${min}&max=${max}`,
		)
			.then((res) => res.json())
			.then(({ hotels }) => {
				setHotels(hotels);
			})
			.catch((err) => {
				throw new Error(err.message);
			})
			.finally(() => setLoading(false));
	}, [searchPhrase, page, PAGINATION_LIMIT, country, min, max, setLoading]);

	return { hotels };
};
