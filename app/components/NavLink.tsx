"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ILinks {
	classes: string;
	pagename: string;
	url: string;
	children: string;
}

const NavLink = ({ classes, pagename, url, children }: ILinks) => {
	const pathname = usePathname()!.slice(1);
	const active = pagename === pathname ? "text-yellow-400" : "text-black";
	return (
		<li className={`${active} ps-5`}>
			<Link
				className={`${classes}
				${active}`}
				href={url}
			>
				{children}
			</Link>
		</li>
	);
};

export default NavLink;
