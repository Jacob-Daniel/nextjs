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

export default function Nav({
	pages,
	places,
}: {
	pages: IPages;
	places: IPlaces;
}) {
	return (
		<nav className="col-span-12 grid grid-cols-12 align-middle lg:col-span-10 lg:col-start-2">
			<div className="col-span-2 flex align-middle">
				<Link href="/" className="my-auto">
					<Image
						className="logo"
						loading="lazy"
						alt="Torriano Meeting House"
						src={img}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
					/>
				</Link>
			</div>
			<Ul pages={pages} places={places} />
		</nav>
	);
}
