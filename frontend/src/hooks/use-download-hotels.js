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
	const [lastPage, setLastPage] = useState(1);
	const { loading, setLoading } = useLoading();

	useEffect(() => {
		setLoading(true);
		fetch(
			`/hotels?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}&country=${country}&min=${min}&max=${max}`,
		)
			.then((res) => res.json())
			.then(({ data: { hotels, lastPage } }) => {
				setHotels(hotels);
				setLastPage(lastPage);
			})
			.catch((e) => console.log(e))
			.finally(() => setLoading(false));
	}, [searchPhrase, page, PAGINATION_LIMIT, country, min, max, setLoading]);

	return { hotels, lastPage };
};
