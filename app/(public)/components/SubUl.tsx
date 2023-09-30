import SubLi from "@components/SubLi";

interface ILinks {
	id: number;
	activeId: number;
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

export default function SubUl({ id, activeId, links }: ILinks) {
	return (
		<ul
			className={`border-1 start absolute top-8 z-50 grid border bg-white p-2 text-center ${
				id === activeId ? "block" : "hidden"
			}`}
		>
			{Object.entries(links as ILink).map(([k, v]) => {
				return <SubLi key={k} path={v.path} title={v.title} />;
			})}
		</ul>
	);
}
