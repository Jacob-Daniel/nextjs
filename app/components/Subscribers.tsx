import { dbconnect } from "@/lib/dbconnect";

interface ISubscribers {
	email: string;
	id: number;
}

export default async function Subscribers() {
	async function getSubscribers() {
		const sql = `SELECT email, id from subscribers where unsub !=?`;
		const res = await dbconnect({ query: sql, values: [1] });
		return res;
	}
	const subscribers: ISubscribers[] = await getSubscribers();
	return (
		<section className="list mb-16">
			<h2 className="font-bold">Subscribers</h2>
			<ul className="block">
				{Object.entries(subscribers).map((link) => {
					return <li key={link[1].id}>{link[1].email}</li>;
				})}
			</ul>
		</section>
	);
}
