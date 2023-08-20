import Link from "next/link";
import { dbconnect } from "@/lib/dbconnect";
import NavLink from "@/app/components/NavLink";

interface INav extends Array<IOptions> {}

interface IOptions {
	id: number;
	title: string;
	pagename: string;
}

export default async function Header() {
	async function getNav() {
		const sql = `SELECT id,pagename,title from pages where in_main_menu = ? order by pageorder`;
		const res = await dbconnect({ query: sql, values: [1] });
		return res;
	}
	const nav: INav[0] = await getNav();
	let heading;
	return (
		<header className="col-span-12 grid grid-cols-12 border-b px-5 lg:px-0">
			<nav
				className={`col-span-12 grid grid-cols-4 align-middle lg:col-span-10 lg:col-start-2`}
			>
				<ul className="col-span-2 hidden justify-end self-center md:flex">
					{Object.entries(nav).map((link, i): any => {
						return (
							<NavLink
								key={link[1].id}
								pagename={link[1].pagename}
								url={process.env.BASE_URL + link[1].pagename}
							>
								{link[1].title}
							</NavLink>
						);
					})}
				</ul>
			</nav>
		</header>
	);
}
