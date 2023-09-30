import { dbconnect } from "@/lib/functions";
import type { Metadata, ResolvingMetadata } from "next";

interface IPage {
	id: number;
	path: string;
	title: string;
	pagecontent: string;
	imagepath: string;
	summary: string;
	metak: string;
	metad: string;
}

type Props = {
	params: { id: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent?: ResolvingMetadata,
): Promise<Metadata> {
	const page: IPage[] = await fetch(`${process.env.BASE_URL}api/page/6`).then(
		(res) => res.json(),
	);
	return {
		title: page[0].title,
		description: page[0].summary,
		keywords: [page[0].metak],
		openGraph: {
			title: page[0].title,
			type: "article",
			url: process.env.BASE_URL + page[0].path,
			image: process.env.BASE_IMG_URL + page[0].imagepath,
		},
		twitter: {
			card: "summary_medium_image",
			title: page[0].title,
			description: page[0].summary,
			image: process.env.BASE_IMG_URL + page[0].imagepath,
		},
	};
}

export default async function Page() {
	async function getPage() {
		const sql = `SELECT id,path,title,metak,metad,pagecontent,imagepath,summary from pages where id = ?`;
		const res = await dbconnect({ query: sql, values: [6] });
		return res;
	}
	const page: IPage[] = await getPage();
	return (
		<main className="col-span-12 grid grid-cols-12 gap-y-10 bg-white pt-5">
			<section className="col-span-12 px-5 md:col-span-6 md:col-start-4 md:px-0">
				<h2>{page[0].title}</h2>
				<div
					className="mb-5"
					dangerouslySetInnerHTML={{
						__html:
							page[0] && page[0].pagecontent
								? page[0].pagecontent
								: "",
					}}
				/>
			</section>
		</main>
	);
}
