"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { destroyServerAction } from "@/app/_userServerActions";
interface ILinks {
	pagename: string;
	path: string;
	children: string;
}

const NavLink = ({ pagename, path, children }: ILinks) => {
	const pathname = usePathname()!.slice(1);
	const active = pagename === pathname ? "text-red-500" : "text-black";
	const handleDestroyServerAction = async (e) => {
		if (e.target.id === "Logout") {
			destroyServerAction();
		}
	};
	return (
		<li className={`${active}`}>
			<Link
				id={pagename}
				onClick={(e) => handleDestroyServerAction(e)}
				className="hover:text-yellow-400"
				href={path}
			>
				{children}
			</Link>
		</li>
	);
};

export default NavLink;
