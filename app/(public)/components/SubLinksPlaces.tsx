import NavLink from "@components/NavLink";
interface ILinks {
	id: number;
	showId: number;
	show: boolean;
	links: {
		id: number;
		path: string;
		title: string;
		pageparent: number;
	};
}
interface ILink {
	id: number;
	path: string;
	title: string;
	pageparent: number;
}

export default function SubLinksPlaces({ id, showId, show, links }: ILinks) {
	return (
		<ul
			className={`absolute z-50 grid border bg-white p-3 ${
				id === showId && show ? "block" : "hidden"
			}`}
		>
			{Object.entries(links as ILink).map(([k, v]) => {
				return <NavLink key={k} path={v.path} title={v.title} />;
			})}
		</ul>
	);
}
