import Image from "next/image";
import Link from "next/link";
import Ul from "@components/Ul";
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

export default function Nav({
	pages,
	places,
}: {
	pages: IPages;
	places: IPlaces;
}) {
	return (
		<nav className="col-span-12 grid grid-cols-12 align-middle">
			<Ul pages={pages} places={places} />
		</nav>
	);
}
