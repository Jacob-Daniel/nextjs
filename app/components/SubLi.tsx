"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ILinks {
	path: string;
	title: string;
}

export default function SubLi({ path, title }: ILinks) {
	const pathname = usePathname()!.slice(1);
	const active = path === pathname ? "text-red-500" : "text-black";
	return (
		// <li>
		<Link
			className={`lh-1 w-sm-auto lh-base w-full text-lg uppercase hover:text-yellow-400
				${active}`}
			href={process.env.BASE_URL + path}
		>
			{title}
		</Link>
		// </li>
	);
}
