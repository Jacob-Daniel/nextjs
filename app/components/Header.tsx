import { dbconnect } from "@/lib/dbconnect";
import Nav from "@/app/components/Nav";

interface IPages extends Array<IOptions> {}

interface IOptions {
	id: number;
	title: string;
	path: string;
	pageparent: number;
}

export default async function Header() {
	async function getPages() {
		const sql = `SELECT id,path,title,pageparent from pages where id = ?`;
		const res = await dbconnect({ query: sql, values: [22] });
		return res;
	}
	const pages: IPages[0] = await getPages();

	return (
		<header className="col-span-12 grid grid-cols-12 border-b px-5 lg:px-0">
			<Nav pages={pages} />
		</header>
	);
}
