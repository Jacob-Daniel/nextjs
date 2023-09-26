import Image from "next/image";
import Link from "next/link";
import Ul from "@/app/components/Ul";
import img from "@/public/images/logo.jpg";

interface IPages {
	id: number;
	title: string;
	path: string;
	pageparent: number;
}

interface IPlaces {
	id: number;
	title: string;
	path: string;
	pageparent: number;
}

export default function Nav({ pages }: { pages: IPages }) {
	return (
		<nav className="col-span-12 grid grid-cols-12 align-middle">
			<Ul pages={pages} />
		</nav>
	);
}
