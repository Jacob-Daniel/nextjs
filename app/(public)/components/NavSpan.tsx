"use client";
import { usePathname } from "next/navigation";

interface ILinks {
	id: number;
	path: string;
	title: string;
	activeId: number;
}

export default function NavSpan({ id, path, title, activeId }: ILinks) {
	const pathname = usePathname()!.slice(1);
	const active = path === pathname ? "text-red-500" : "text-black";

	return (
		<span
			data-id={id}
			className={`lh-1 w-sm-auto lh-base w-full text-lg uppercase hover:text-yellow-400
				${active} cursor-pointer`}
		>
			{title}
		</span>
	);
}
