export async function all(
	searchPhrase,
	page,
	PAGINATION_LIMIT,
	country,
	min,
	max,
	rating,
) {
	try {
		const response = await fetch(
			`/hotels?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}&country=${country}&min=${min}&max=${max}&rating=${rating}`,
		);
		const { hotels, lastPage } = await response.json();
		return { hotels, lastPage };
	} catch (err) {
		return { error: err.message || 'Error downloading hotels' };
	}
}

export async function one(id) {
	const response = await fetch(`/hotels/${id}`);
	const { data } = await response.json();

	return data;
}
