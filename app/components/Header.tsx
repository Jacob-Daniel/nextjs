import Link from "next/link";
import { dbconnect } from "@/lib/dbconnect";
import NavLink from "@/app/components/NavLink";

export default async function Header() {
	const nav = ["home", "subscribe", "contact"];
	return (
		<header className="col-span-12 grid grid-cols-12 border-b px-5 lg:px-0">
			<nav
				className={`col-span-12 grid grid-cols-4 align-middle lg:col-span-10 lg:col-start-2`}
			>
				<ul className="col-span-2 hidden justify-end self-center md:flex">
					{nav.map((link) => {
						return (
							<NavLink
								classes="text-xl capitalize lg:text-2xl"
								key={link}
								pagename={link}
								url={link === "home" ? "/" : "/" + link}
							>
								{link}
							</NavLink>
						);
					})}
				</ul>
			</nav>
		</header>
	);
}
