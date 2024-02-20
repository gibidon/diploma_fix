export async function all() {
	const response = await fetch('/users');
	const data = await response.json();

	return data;
}
