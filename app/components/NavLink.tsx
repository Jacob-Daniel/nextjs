"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ILinks {
	pagename: string;
	url: string;
	children: string;
}

const NavLink = ({ pagename, url, children }: ILinks) => {
	const pathname = usePathname()!.slice(1);
	const active = pagename === pathname ? "text-yellow-400" : "text-black";
	return (
		<li className={`${active} ps-5`}>
			<Link
				className={`w-full font-bebas-neue text-xl md:text-1xl lg:text-2xl lh-1 w-sm-auto lh-base
				${active}`}
				href={url}
			>
				{children}
			</Link>
		</li>
	);
};

export default NavLink;
