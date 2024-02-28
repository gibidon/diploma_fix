export async function all(id) {
	try {
		const response = await fetch(`/users/${id}/reservations`);
		const data = await response.json();

		return data;
	} catch (err) {
		return { error: err.message };
	}
}
