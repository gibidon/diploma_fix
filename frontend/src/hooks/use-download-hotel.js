import { useState, useEffect } from 'react';

export const useDownloadHotel = (id) => {
	const [hotel, setHotel] = useState({
		title: '',
		description: '',
		images: [],
		price: null,
		country: '',
		reviews: [],
	});

	useEffect(() => {
		fetch(`/hotel/${id}`)
			.then((res) => res.json())
			.then(({ data }) => {
				setHotel(data);
			});
	}, [id]);

	return hotel;
};
