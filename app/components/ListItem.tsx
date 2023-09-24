"use client";
import SubLi from "@/app/components/SubLi";
import NavSpan from "@/app/components/NavSpan";
import SubUl from "@/app/components/SubUl";
import SubLinksPlaces from "@/app/components/SubLinksPlaces";
import { useState, useEffect } from "react";

interface ILinks {
	link: { id: number; path: string; title: string; pageparent: number };
	data: any;
	click: number;
}

export default function ListItem({ link, data, click }: ILinks) {
	// console.log("active:", click);

	let { id, path, title } = link;
	return (
		<>
			<MenuItemType id={id} path={path} title={title} activeId={click} />
			<SubUlType id={id} path={path} activeId={click} sublinks={data} />
		</>
	);
}

interface IType {
	id: number;
	path: string;
	activeId: number;
	sublinks: {
		id: number;
		path: string;
		title: string;
		pageparent: number;
	};
}

function SubUlType({ id, path, activeId, sublinks }: IType) {
	if (id === 3 || id === 6) {
		return <SubUl id={id} activeId={activeId} links={sublinks} />;
	} else {
		return null;
	}
}

interface IMenuItem {
	id: number;
	path: string;
	title: string;
	activeId: number;
	// onShow?(): React.MouseEvent | void;
}

function MenuItemType({ id, path, title, activeId }: IMenuItem) {
	if (id === 3 || id === 6) {
		return (
			<NavSpan id={id} path={path} title={title} activeId={activeId} />
		);
	} else {
		return <SubLi path={path} title={title} />;
	}
}