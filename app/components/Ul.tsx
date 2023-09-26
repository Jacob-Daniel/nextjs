"use client";
import { useWindowListener } from "@/lib/clientFunctions";
import { useState, useEffect } from "react";
import ListItem from "@/app/components/ListItem";

interface IPages {
	id: number;
	title: string;
	path: string;
	pageparent: number;
}

export default function Ul({
	pages,
}: {
	pages: { id: number; pageparent: number; path: string; title: string };
}) {
	const subpages: {
		id: number;
		pageparent: number;
		path: string;
		title: string;
	}[] = [];
	const [click, setClick] = useState(0);

	const handleDomClick = (e: React.MouseEvent | any) => {
		setClick(typeof e.target.dataset.id === "undefined" ? 0 : click);
	};
	useWindowListener("click", handleDomClick);
	const handleClick = (e: React.MouseEvent | any) => {
		setClick(+e.currentTarget.dataset.id);
	};

	return (
		<ul className="col-span-10 flex w-full items-center justify-end gap-5">
			{Object.entries(pages as IPages).map(([k, v]) => {
				if (+v.pageparent === 6) {
					subpages.push({
						id: +v.id,
						pageparent: +v.pageparent,
						path: v.path,
						title: v.title,
					});
				}
				if (+v.pageparent === 0) {
					return (
						<li
							key={v.id}
							data-id={v.id}
							className={`relative flex justify-center text-center uppercase ${
								click === v.id ? "active" : "notactive"
							}`}
							onClick={(e) => handleClick(e)}
						>
							<ListItem
								link={v}
								data={+v.id === 3 ? places : subpages}
								click={click}
							/>
						</li>
					);
				}
			})}
		</ul>
	);
}
