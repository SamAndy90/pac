import { client } from '../../../sanity/lib/client'

export async function getData() {
	const fetchData = await client.fetch("*[_type == 'slider'] ")
	return fetchData
}
