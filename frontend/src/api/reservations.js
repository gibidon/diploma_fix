export async function all(id) {
	const response = await fetch(`/users/${id}/reservations`);
	const data = await response.json();

	return data;
}
