import { dbconnect } from "@/lib/dbconnect";
import Nav from "@/app/components/Nav";

interface IPages extends Array<IOptions> {}

interface IOptions {
	id: number;
	title: string;
	path: string;
	pageparent: number;
}

interface IPlaceOptions {
	id: number;
	title: string;
	path: string;
	pageparent: string;
}
interface IPlaces extends Array<IPlaceOptions> {}

export default async function Header() {
	async function getPages() {
		const sql = `SELECT id,path,title,pageparent from pages where active = ? and in_main_menu = ? order by pageorder`;
		const res = await dbconnect({ query: sql, values: [1, 1] });
		return res;
	}
	const pages: IPages[0] = await getPages();

	async function getPlaces() {
		const sql = `SELECT id,path,title,page_id from places where active = ?`;
		const res = await dbconnect({ query: sql, values: [1] });
		return res;
	}
	const places: IPlaces[0] = await getPlaces();
	return (
		<header className="col-span-12 grid grid-cols-12 border-b px-5 lg:px-0">
			<Nav pages={pages} places={places} />
		</header>
	);
}
