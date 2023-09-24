"use client";
import NavItem from "./NavItem";
import Link from "next/link";
interface INav extends Array<IOptions> {}

interface IOptions {
	id: number;
	title: string;
	pagename: string;
}
export default function Nav({ loggedIn }: { loggedIn: boolean | undefined }) {
	const state = loggedIn ? "Logout" : "Login";
	const links: INav = [
		{ id: 1, title: "Dashboard", pagename: "/admin/dashboard" },
		// { id: 2, title: "Admin", pagename: "/admin" },
		{ id: 3, title: state, pagename: "/admin" },
	];
	return (
		<nav className="flex justify-end align-middle col-span-1 col-start-2">
			<ul className="flex flex-row gap-3 items-center">
				{links.map((item: any, i: number) => {
					return (
						<NavItem
							key={item.id}
							path={item.pagename}
							pagename={item.title}
						>
							{item.title}
						</NavItem>
					);
				})}
			</ul>
		</nav>
	);
}
