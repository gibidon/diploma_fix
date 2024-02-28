export async function all() {
	try {
		const response = await fetch('/users');
		const data = await response.json();

		return data;
	} catch (err) {
		return { error: err.message };
	}
}
